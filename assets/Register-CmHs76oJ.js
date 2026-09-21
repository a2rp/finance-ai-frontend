import{u as g,a as h,r as f,j as e,d as b,y as o}from"./index-DFxzaWm5.js";import{a as j,A as v}from"./index-SG7PDS-F.js";const R=()=>{const{login:p}=g(),m=h(),[n,x]=f.useState({name:"",email:"",password:""}),t=r=>x({...n,[r.target.name]:r.target.value}),u=async r=>{var s,i,d,c,l;r.preventDefault();try{const a=await j.post(`${v}/users/register`,n);p(a.data),m("/")}catch(a){o.error(((i=(s=a==null?void 0:a.response)==null?void 0:s.data)==null?void 0:i.message)||"Registration failed"),((d=a.response)==null?void 0:d.status)===429?o.error("🚫 Too many requests. Please wait a moment."):o.error(((l=(c=a.response)==null?void 0:c.data)==null?void 0:l.message)||"Something went wrong")}};return e.jsx(e.Fragment,{children:e.jsx(w.Wrapper,{children:e.jsxs("div",{className:"main",children:[e.jsx("h1",{className:"heading","data-aos":"zoom-in",children:"Register"}),e.jsxs("form",{onSubmit:u,children:[e.jsx("input",{name:"name",placeholder:"Name",onChange:t,required:!0,"data-aos":"fade-left"}),e.jsx("input",{name:"email",placeholder:"Email",onChange:t,required:!0,"data-aos":"fade-right"}),e.jsx("input",{name:"password",type:"password",placeholder:"Password",onChange:t,required:!0,"data-aos":"fade-left"}),e.jsx("button",{type:"submit","data-aos":"zoom-in",children:"Register"})]}),e.jsx("div",{className:"alreadyHaveAnAccount",children:e.jsxs("p",{"data-aos":"fade-right",children:["Already have an account? ",e.jsx("a",{href:"/login",children:"Login"})]})})]})})})},w={Wrapper:b.div`
        /* border: 1px solid #f00; */
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .main {
            border: 1px solid #ccc;
            width: 100%;
            max-width: 400px;
            margin: auto;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;

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
    
                button {
                    height: 40px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
    
                    &:hover {
                        background: #0056b3;
                    }
                }
            }

              .alreadyHaveAnAccount {
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

    `};export{R as default};
