import ExpensePieChart from '../components/ExpensePieChart';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import SummaryCards from '../components/SummaryCards';
import TransactionTable from '../components/TransactionTable';
import AddTransactionForm from '../components/AddTransactionForm';
import { useState } from 'react';
import AiAdvisor from '../components/AiAdvisor';
import styled from 'styled-components';

const Dashboard = () => {
    const [refresh, setRefresh] = useState(false);
    const refreshKey = refresh ? 'refresh-true' : 'refresh-false';


    const handleAdd = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            <Styled.Wrapper>
                <Styled.Main>
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: '20px',
                            color: '#000',
                            fontStyle: 'italic'
                        }}

                    >
                        ⚠️ Backend is hosted on free Render server. It may take time to respond if inactive.
                    </div>
                    <Styled.Heading

                    >Dashboard</Styled.Heading>

                    <section

                    >
                        <AiAdvisor />
                    </section>

                    <Styled.SummaryFormWrapper>
                        <div className="col">
                            <section

                            >
                                <AddTransactionForm onAdd={handleAdd} />
                            </section>
                        </div>
                        <div className="col">
                            <section

                            >
                                <SummaryCards key={`summary-${refreshKey}`} />
                            </section>
                        </div>
                    </Styled.SummaryFormWrapper>

                    <Styled.GraphWrapper>
                        <div className="col">
                            <section

                            >
                                <IncomeExpenseChart key={`income-${refreshKey}`} />
                            </section>
                        </div>
                        <div className="col">
                            <section

                            >
                                <ExpensePieChart key={`expense-${refreshKey}`} />
                            </section>
                        </div>
                    </Styled.GraphWrapper>

                    <TransactionTable
                        key={`table-${refreshKey}`}
                        onUpdate={() => setRefresh(!refresh)}
                    />
                </Styled.Main>
            </Styled.Wrapper>
        </>
    );
};

export default Dashboard

const Styled = {
    Wrapper: styled.div``,

    Main: styled.div``,

    Heading: styled.div`
        margin-bottom: 20px;
    `,

    SummaryFormWrapper: styled.div`
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        align-items: stretch;

        @media (width<800px) {
            flex-direction: column;
        }

        .col {
            /* border: 1px solid #f00; */
            width: 100%;
            /* background-color: #fff; */
        }
    `,

    GraphWrapper: styled.div`
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        align-items: stretch;

        @media (width<800px) {
            flex-direction: column;
        }

        .col {
            /* border: 1px solid #f00; */
            width: 100%;
            /* background-color: #fff; */
        }
    `,
};
