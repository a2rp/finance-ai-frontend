import styled from "styled-components";

export const Styled = {
    Wrapper: styled.footer`
        width: min(1440px, calc(100% - 32px));
        margin: 0 auto;
        padding: 18px 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        border-top: 1px solid #d6d6d6;
        color: #777;
        font-size: 12px;

        p {
            margin: 0;
        }

        p a {
            color: #222;
            font-weight: 700;
            transition: color 160ms ease, text-shadow 160ms ease;
        }

        p a:hover {
            color: #0b6bcb;
            text-shadow: 0 0 12px rgba(11, 107, 203, 0.28);
        }

        @media (max-width: 600px) {
            align-items: flex-start;
            flex-direction: column;
        }
    `,

    Links: styled.nav`
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 7px;

        a {
            display: grid;
            width: 31px;
            height: 31px;
            place-items: center;
            border: 1px solid #c9c9c9;
            border-radius: 8px;
            color: #5f5f5f;
            transition: color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
        }

        a:hover,
        a:focus-visible {
            border-color: #0b6bcb;
            color: #0b6bcb;
            box-shadow: 0 0 15px rgba(11, 107, 203, 0.2);
            outline: none;
        }

        svg {
            width: 15px;
            height: 15px;
        }

        @media (max-width: 600px) {
            justify-content: flex-start;
        }
    `,
};