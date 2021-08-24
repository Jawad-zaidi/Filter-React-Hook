import React, { useState, useEffect } from "react";
function Data(){

    const [userList, setUserList] = useState([]);
    const [searchTerm, setsearchterm] = useState("");
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(result => setUserList(result))
    .catch(error => console.log(error))

  },[])

    return <div>
        <center>
        <input type="text" placeholder="search.." className="form-control" style={{ marginTop: 50, marginBottom: 20, width: "40%"}}
        onChange={(e) =>{
            setsearchterm(e.target.value);
        }}
        />
        
        <table>
            <tr>
                
                <th>Country</th>
                
            </tr>
            {
               
                userList && userList.filter(val=>{
                    if(searchTerm === ""){
                        return val;
                    } else if(
                        val.region.toLowercase().includes(searchTerm.toLowercase())
                    )
                    return val;
                })
                .map(usr =>
                   <tr>
                       
                       <td>{usr.region}</td>
                    </tr> 
                 )
                 
            }
        </table>
        </center>
    </div>

}


export default Data;