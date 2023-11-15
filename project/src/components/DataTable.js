"use client";
export default function DataTable({state, FormElms, baseurl, action}) {
    return (
        <>
            <h1>Result</h1>        
                                <form action={action}>   
                                   <input type="hidden" name="method" value="GET" />
                                   <input type="hidden" name="BASE_URL" value={baseurl} />
                                   <input type="hidden" name="schema" value={FormElms.current.schemaUser?"user":FormElms.current.schemaPets?"pets":""} />
                                   <input type="submit" value="Refresh" />
                               </form>
            {state && state.data && state.data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(state.data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {state.data.map((item) => (
                            <tr key={item.id}>
                                {Object.keys(item).map((key) => (
                                    <td key={key}>
                                        {key.includes("atedAt")
                                            ? new Date(item[key]).toLocaleString()
                                            : item[key]}
                                    </td>
                                ))}
                                <td>
                                    <button
                                        onClick={() => {
                                                FormElms.current.id.value = item.id;
                                                if(FormElms.current.petType&&FormElms.current.petName){
                                                FormElms.current.petType.value = item.type;
                                                FormElms.current.petName.value = item.name;
                                                if(FormElms.current.name){
                                                FormElms.current.name.value = null;
                                                }
                                                if(FormElms.current.email){
                                                FormElms.current.email.value = null;
                                                }
                                                }
                                                else{
                                                FormElms.current.name.value = item.name;
                                                FormElms.current.email.value = item.email;
                                                if(FormElms.current.petType){
                                                FormElms.current.petType.value = null;
                                                }
                                                if(FormElms.current.petName){
                                                FormElms.current.petName.value = null;
                                                }
                                                }
                                                FormElms.current.method.value = "PATCH";
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                <form action={action} method="DELETE">
                                    <input type="hidden" name="id" value={item.id} />
                                    <input type="hidden" name="method" value="DELETE" />
                                    <input type="hidden" name="BASE_URL" value={baseurl} />
                                    <input type="hidden" name="schema" value={FormElms.current.schemaUser?"user":FormElms.current.schemaPets?"pets":""} />
                                    <input type="submit" value="Delete" />
                                </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                "No data"
            )}
            {state && state.error && state.code && state.error.length > 0 && state.code > 0 ? (
                <div>
                    <strong>{state.code}</strong>: <span>{state.error}</span>
                </div>
            ) : (
                ""
            )}
        </>
    );
}