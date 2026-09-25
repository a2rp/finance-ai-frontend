import{u as b,a as w,r as g,j as e,C as j,N as v,d as y,y as a}from"./index-BGAquoYm.js";import{a as L,A as S}from"./index-SG7PDS-F.js";const C=()=>{const{login:h}=b(),u=w(),[o,m]=g.useState({email:"",password:""}),[n,s]=g.useState(!1),i=t=>m({...o,[t.target.name]:t.target.value}),f=async t=>{var d,c,l,p,x;t.preventDefault(),s(!0);try{const r=await L.post(`${S}/users/login`,o);h(r.data),u("/")}catch(r){a.error(((c=(d=r==null?void 0:r.response)==null?void 0:d.data)==null?void 0:c.message)||"Login failed"),((l=r.response)==null?void 0:l.status)===429?a.error("Too many requests. Please wait a moment."):a.error(((x=(p=r.response)==null?void 0:p.data)==null?void 0:x.message)||"Something went wrong")}finally{s(!1)}};return e.jsx(e.Fragment,{children:e.jsx(k.Wrapper,{children:e.jsxs("div",{className:"main",children:[e.jsx("h1",{className:"heading",children:"Login"}),e.jsxs("form",{onSubmit:f,children:[e.jsx("input",{name:"email",placeholder:"Email",onChange:i,required:!0}),e.jsx("input",{name:"password",type:"password",placeholder:"Password",onChange:i,required:!0}),e.jsx("button",{type:"submit",disabled:n,children:n?e.jsx(e.Fragment,{children:e.jsx(j,{size:16,style:{color:"#fff"}})}):"Login"})]}),e.jsx("div",{className:"createAccount",children:e.jsxs("p",{children:["Don't have an account? ",e.jsx(v,{to:"/register",children:"Register"})]})})]})})})},k={Wrapper:y.div`
        /* border: 1px solid #f00; */
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: box-shadow 0.2s ease;

        .main {
            border: 1px solid #ccc;
            width: 100%;
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.2s ease;
            overflow: hidden;

            &:hover {
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .heading {
                margin-bottom: 20px;
                text-align: center;
                font-size: 24px;
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 15px;

                input {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .forgetPasswordLink {
                    /* border: 1px solid #007bff; */
                    height: 30px;
                    text-align: center;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    color: #007bff;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                button {
                    display: block;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    overflow: hidden;
                    height: 40px;

                    &:hover {
                        background: #0056b3;
                    }
                }
            }

            .createAccount {
                text-align: center;
                margin-top: 15px;

                p {
                    margin: 0;
                    font-size: 14px;

                    a {
                        color: #007bff;
                        text-decoration: none;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

    `};export{C as default};
