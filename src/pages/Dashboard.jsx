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
                    <div style={{ textAlign: 'center', marginBottom: '20px', color: '#000', fontStyle: 'italic' }}>
                        ⚠️ Backend is hosted on free Render server. It may take time to respond if inactive.
                    </div>
                    <Styled.Heading>Dashboard</Styled.Heading>

                    <AiAdvisor />

                    <Styled.SummaryFormWrapper>
                        <div className="col">
                            <AddTransactionForm onAdd={handleAdd} />
                        </div>
                        <div className="col">
                            <SummaryCards key={`summary-${refreshKey}`} />
                        </div>
                    </Styled.SummaryFormWrapper>


                    <Styled.GraphWrapper>
                        <div className="col">
                            <IncomeExpenseChart key={`income-${refreshKey}`} />
                        </div>
                        <div className="col">
                            <ExpensePieChart key={`expense-${refreshKey}`} />
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
