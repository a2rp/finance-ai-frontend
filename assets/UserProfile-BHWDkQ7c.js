import{r as l,u as j,j as e,d as p,y as d}from"./index-CLCBLA3I.js";import{a as y,A as v}from"./index-SG7PDS-F.js";const P=p.div`
    max-width: 500px;
    margin: 40px auto;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 0 10px #00000010;
    overflow: hidden;
    
    h2 {
        margin-bottom: 15px;;
    }
`,i=p.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
`,S=p.button`
    background: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`,k=()=>{const[m,u]=l.useState(!1),{user:a,setUser:b}=j(),[s,h]=l.useState({name:"",email:"",phone:"",password:""});l.useEffect(()=>{a&&h({name:a.name||"",email:a.email||"",phone:a.phone||"",password:""})},[a]);const t=o=>{h(n=>({...n,[o.target.name]:o.target.value}))},w=async o=>{var n,c,x,f,g;o.preventDefault(),u(!0);try{const r=await y.put(`${v}/users/profile`,s,{headers:{Authorization:`Bearer ${a.token}`}});b({...a,...r.data}),localStorage.setItem("user",JSON.stringify({...a,...r.data})),d("Profile updated successfully")}catch(r){d.error(((c=(n=r==null?void 0:r.response)==null?void 0:n.data)==null?void 0:c.message)||"Update failed"),((x=r.response)==null?void 0:x.status)===429?d.error("Too many requests. Please wait a moment."):d.error(((g=(f=r.response)==null?void 0:f.data)==null?void 0:g.message)||"Something went wrong")}finally{u(!1)}};return e.jsxs(P,{children:[e.jsx("h2",{children:"Edit Profile"}),e.jsxs("form",{onSubmit:w,children:[e.jsx(i,{type:"text",name:"name",value:s.name,onChange:t,placeholder:"Full Name"}),e.jsx(i,{type:"email",name:"email",value:s.email,onChange:t,placeholder:"Email"}),e.jsx(i,{type:"text",name:"phone",value:s.phone,onChange:t,placeholder:"Phone"}),e.jsx(i,{type:"password",name:"password",value:s.password,onChange:t,placeholder:"New Password (leave blank to keep same)"}),e.jsx(S,{type:"submit",disabled:m,children:m?e.jsx(e.Fragment,{children:"Updating..."}):e.jsx(e.Fragment,{children:"Update Profile"})})]})]})};export{k as default};
