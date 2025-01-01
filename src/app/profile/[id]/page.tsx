export default async function userprofile({params}:any){
    const {id}=await params
    
  return(
    <>
    <div>
    
        <h1>this is the profile page </h1>
        <p>{id}</p>
    </div>
    </>

  )

}