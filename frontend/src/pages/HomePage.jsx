import React from 'react'

const HomePage = ({
  votes,
  setVotes,
  error,
  user,
  setUser,
  showNotification,
}) => {
  const handleVote = async(voteId)=>{
    try {
      const response = await fetch(
      `${import.meta.env.VITE_API}/api/vote/${voteId}`,{
        method : "POST",
         headers: { 
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`},
          
      }
      
    );

    console.log(import.meta.env.VITE_API)

    const data = await response.json();
    if(!response.ok){ 
      
      throw new Error(data.error || "something went wrong");
    }
    // const data = await response.json();
    setVotes((prev)=>
      prev.map((v)=>(v?._id === data?.vote?._id ? data?.vote:v))
    );
    setUser(data?.user);
    } catch (error) {
      showNotification(error.message,"error")
    }
  };
  console.log(error,"error")
  return (
    <div className='votes-page'>
      {error && <div className='error-message'>{error}</div>}
      <div className='votes-grid'>
        {votes?.map((vote,index)=>(
          <div className='vote-card' key={index}>
            <h3>{vote.option}</h3>
            <p className='vote-count'>Votes:{vote.votes}</p>
            <p className='createdBy'>Created By:{vote.createdBy?.email}</p>
            <button 
            className={`vote-btn ${
              !user || user?.votedFor ? "disabled":""
              }`}
              onClick={()=>handleVote(vote?._id)}
               disabled={!!(user && user.votedFor)}
              >
                {vote?._id === user?.votedFor ? "Voted":"Vote"}
              </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage





