import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        /* border: 1px solid #f00; */
        max-width: 1440px;
        margin: 0 auto;
        /* display: flex;
        min-height: 100vh; */
    `,
    Header: styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        z-index: 1000;
        background: #000;
        color: white;

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 0 15px;
    `,
    AppName: styled.h1``,
    UserMenu: styled.div`
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: transform 0.3s ease;
        &:hover {
            transform: scale(1.05);
        }
    `,
    User: styled.div``,
    Menu: styled.div`
        /* border: 1px solid #f00; */
        display: flex;
        align-items: flex-end;
        .icon {
            transition: transform 0.2s ease;
            &.active {
                transform: rotate(180deg);
            }
        }
    `,
    DropdownMenuWrapper: styled.div`
        position: fixed;
        top: 60px;
        right: 0;
        width: 200px;
        background-color: #000;
        animation: appearDropdownMenuWrapper 0.2s linear 1 forwards;
        @keyframes appearDropdownMenuWrapper {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .menuWrapper {
            /* border: 1px solid #f00; */
            height: 100%;

            ul {
                list-style-type: none;

                li {
                    .link,
                    .logout {
                        /* border: 1px solid #f00; */
                        width: 100%;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        color: white;
                        text-decoration: none;
                        padding: 5px 15px;
                        cursor: pointer;

                        &:hover {
                            background-color: #333;
                        }
                    }
                    /* .logout {
                        padding: 5px 15px;
                        cursor: pointer;
                        color: white;
                    } */
                }
            }
        }
    `,

    Main: styled.main`
        /* display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 0 15px; */
    `,

    Sidebar: styled.div`
        width: 220px;
        background: #111;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        nav a,
        nav button {
            color: white;
            text-decoration: none;
            background: none;
            border: none;
            margin-top: 10px;
            cursor: pointer;
        }
    `,

    RoutesWrapper: styled.div`
        padding: 100px 15px;
        background: #f4f4f4;
    `,
};
