import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePostSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setPosts([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios(
      "https://my.api.mockaroo.com/mock_post-feed.json?key=23d25ba0"
      /*{
      method: 'GET',
      url: 'api',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
      }*/
    ).then(res => {
      setPosts(prevPosts => {
        return [...new Set([...prevPosts, ...res.data.map()])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, posts, hasMore }
}