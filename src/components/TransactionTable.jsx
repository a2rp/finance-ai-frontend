import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import ConfirmModal from './ConfirmModal';
import EditTransactionModal from './EditTransactionModal';
import { toast } from 'react-toastify';
import ClearAllModal from './ClearAllModal';
import API_BASE_URL from '../api';

const TransactionTable = ({ refresh, onUpdate }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/transactions`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setTransactions(res.data);
            } catch (err) {
                console.error('Table fetch error:', err.message);
                if (err.response?.status === 429) {
                    toast.error("🚫 Too many requests. Please wait a moment.");
                } else {
                    toast.error(err.response?.data?.message || "Something went wrong");
                }
            }
        };
        fetch();
    }, []);

    const filtered = transactions.filter((txn) => {
        const matchType = filterType === 'all' || txn.type === filterType;
        const matchSearch = txn.category.toLowerCase().includes(search.toLowerCase()) || txn.description?.toLowerCase().includes(search.toLowerCase());
        return matchType && matchSearch;
    });

    // delete 
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/transactions/${selectedId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTransactions((prev) => prev.filter(txn => txn._id !== selectedId));
            setShowModal(false);
            setSelectedId(null);
            onUpdate();
        } catch (err) {
            console.error('Delete failed:', err.message);
            if (err.response?.status === 429) {
                toast.error("🚫 Too many requests. Please wait a moment.");
            } else {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedId(null);
    };

    // edit
    const [editTxn, setEditTxn] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // clearall transactions
    const [showClearModal, setShowClearModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const handleClearAll = async () => {
        const confirmed = window.confirm("Are you sure you want to delete all transactions?");
        if (!confirmed) return;
        setIsLoading(true);

        try {
            await axios.delete(`${API_BASE_URL}/transactions/clear`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            toast.success("All transactions deleted");
            setTransactions([]); // reset state
        } catch (err) {
            toast.error("Failed to delete transactions");
            console.error(err.message);
            if (err.response?.status === 429) {
                toast.error("🚫 Too many requests. Please wait a moment.");
            } else {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Wrapper>
                <Top>
                    <section
                        data-aos="slide-up"
                    >
                        <h3>Transactions</h3>
                    </section>

                    <section
                        data-aos="fade-in"
                    >
                        <Controls>
                            <input
                                type="text"
                                placeholder="Search Cat./Desc."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">All</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <button className="clear-btn" onClick={() => setShowClearModal(true)} disabled={isLoading}>
                                {isLoading ? 'Clearing...' : 'Clear All'}
                            </button>
                        </Controls>
                    </section>
                </Top>

                <Table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((txn) => (
                            <tr key={txn._id} data-aos="fade-up">
                                <td>{txn.type}</td>
                                <td>₹ {txn.amount.toLocaleString()}</td>
                                <td>{txn.category}</td>
                                <td>{txn.description || '-'}</td>
                                <td>{format(new Date(txn.date), 'dd MMM yyyy')}</td>
                                <td className='actions'>
                                    <FaEdit
                                        className='action edit'
                                        onClick={() => {
                                            setEditTxn(txn);
                                            setShowEditModal(true);
                                        }}
                                    />
                                    <MdDeleteForever className='action delete' onClick={() => handleDeleteClick(txn._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Wrapper>

            {showModal && <ConfirmModal onConfirm={confirmDelete} onCancel={cancelDelete} />}

            {showEditModal && (
                <EditTransactionModal
                    txn={editTxn}
                    onClose={() => setShowEditModal(false)}
                    onUpdated={() => {
                        onUpdate(); // from Dashboard
                        setShowEditModal(false);
                    }}
                />
            )}

            {showClearModal && (
                <ClearAllModal
                    onConfirm={async () => {
                        setIsLoading(true);
                        try {
                            await axios.delete(`${API_BASE_URL}/transactions/clear`, {
                                headers: { Authorization: `Bearer ${user.token}` },
                            });
                            toast.success("All transactions deleted");
                            setTransactions([]);
                            setShowClearModal(false);
                            onUpdate();
                        } catch (err) {
                            toast.error("Failed to delete transactions");
                            console.error(err.message);
                            if (err.response?.status === 429) {
                                toast.error("🚫 Too many requests. Please wait a moment.");
                            } else {
                                toast.error(err.response?.data?.message || "Something went wrong");
                            }
                        } finally {
                            setIsLoading(false);
                        }
                    }}
                    onCancel={() => setShowClearModal(false)}
                />
            )}


        </>
    );
};

export default TransactionTable;

const Wrapper = styled.div`
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.1);
    overflow-x: auto;

    @media (width<700px) {
        padding: 0;
    }

    transition: 0.2s ease;
    transition-property: box-shadow;
    &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
    }
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;

    @media (width<700px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
    }
`;

const Controls = styled.div`
    display: flex;
    gap: 10px;
    input {
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid #ccc;
    }
    select {
        padding: 6px;
        border-radius: 6px;
    }
    .clear-btn {
        padding: 6px 10px;
        background-color: #F44336;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

`;

const Table = styled.table`
    border: 1px solid #000;
    border-radius: 6px;
    width: 100%;

    thead {
        /* border: 1px solid #f00; */
        background: #333;

        tr {
            th {
                @media (width<700px) {
                    font-size: 10px;
                }
            }
        }
    }

    tbody {
        tr {
            &:hover {
                background-color: #aaa;
                color: #fff;
            }

            td {
                text-align: center;
                @media (width<700px) {
                    font-size: 10px;
                }

                &.actions {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;

                    .action {
                        cursor: pointer;
                        transition: transform 0.2s ease;

                        &:hover {
                            transform: scale(1.5);
                        }

                        &.edit{
                            color: #4CAF50;
                        }
                        &.delete {
                            color: #F44336;
                        }
                    }
                }

            }
        }
    }
`;

