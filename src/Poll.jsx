import React, { useEffect, useState } from 'react'

function Poll() {
    const [data, setdata] = useState([])
    const [page, setpage] = useState(0)
    const [time, settime] = useState(10)
    useEffect(() => {
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`).then(data => data.json()).then(datas => setdata([...data,...datas.hits]) )
        const interval = setInterval(() => {
            setpage(prev => prev +1)
            console.log(page);
        }, 10000);
        return () => clearInterval(interval);

    }, [page])
    console.log(data);
    useEffect(() => {
        
        const interval = setInterval(() => {
            if (time > 0) {
              settime((prevCount) => prevCount - 1);
            } else {
              settime(10);
            }
          }, 1000);
        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
      }, [time]);
    
  return (
    <div>
        <h1 >Polling App </h1>
        <h2>New post in : <span>{time} </span></h2>
        <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Created At</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {data.map((post) => (
          <tr key={post.objectID}>
            <td>{post.title}</td>
            <td>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.url}
              </a>
            </td>
            <td>{post.created_at}</td>
            <td>{post.author}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Poll