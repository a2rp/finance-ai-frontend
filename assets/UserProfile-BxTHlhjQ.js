import{r as l,u as j,j as e,d as m,y as d}from"./index-DFxzaWm5.js";import{a as y,A as v}from"./index-SG7PDS-F.js";const P=m.div`
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
`,i=m.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
`,S=m.button`
    background: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`,k=()=>{const[p,u]=l.useState(!1),{user:t,setUser:b}=j(),[o,h]=l.useState({name:"",email:"",phone:"",password:""});l.useEffect(()=>{t&&h({name:t.name||"",email:t.email||"",phone:t.phone||"",password:""})},[t]);const s=r=>{h(n=>({...n,[r.target.name]:r.target.value}))},w=async r=>{var n,c,f,g,x;r.preventDefault(),u(!0);try{const a=await y.put(`${v}/users/profile`,o,{headers:{Authorization:`Bearer ${t.token}`}});console.log("Profile updated:",a.data),b({...t,...a.data}),localStorage.setItem("user",JSON.stringify({...t,...a.data})),d("Profile updated successfully")}catch(a){d.error(((c=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:c.message)||"Update failed"),((f=a.response)==null?void 0:f.status)===429?d.error("🚫 Too many requests. Please wait a moment."):d.error(((x=(g=a.response)==null?void 0:g.data)==null?void 0:x.message)||"Something went wrong")}finally{u(!1)}};return e.jsxs(P,{children:[e.jsx("h2",{"data-aos":"zoom-in",children:"Edit Profile"}),e.jsxs("form",{onSubmit:w,children:[e.jsx(i,{type:"text",name:"name",value:o.name,onChange:s,placeholder:"Full Name","data-aos":"fade-left"}),e.jsx(i,{type:"email",name:"email",value:o.email,onChange:s,placeholder:"Email","data-aos":"fade-right"}),e.jsx(i,{type:"text",name:"phone",value:o.phone,onChange:s,placeholder:"Phone","data-aos":"fade-left"}),e.jsx(i,{type:"password",name:"password",value:o.password,onChange:s,placeholder:"New Password (leave blank to keep same)","data-aos":"fade-right"}),e.jsx(S,{type:"submit",disabled:p,"data-aos":"zoom-in",children:p?e.jsx(e.Fragment,{children:"Updating..."}):e.jsx(e.Fragment,{children:"Update Profile"})})]})]})};export{k as default};
