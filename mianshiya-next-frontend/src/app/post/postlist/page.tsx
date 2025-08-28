'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { listPostVoByPageUsingPost } from "@/api/postController";
import './index.css';
import PostVO = API.PostVO;
import PostCard from "@/components/PostCard";


export default function PostList() {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(-1);
  const [data, setData] = useState<PostVO[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    listPostVoByPageUsingPost({
      pageSize: 5,
      current: page
    }).then(res => {
      setData([...data, ...res.data.records]);
      setLoading(false);
      setPage(page + 1);
      setTotal(res.data.total);
    });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      className="post_main"
    >
      <div className="scroll_content">
        <div className="advertisement"></div>
        <div className="post_list">
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={total < 0 || data.length < total}
            loader={<Divider plain>加载中</Divider>}
            endMessage={<Divider plain>没有更多了！ 🤐</Divider>}
            scrollableTarget="basicLayout"
          >
            <List
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item key={item.id}>
                  <PostCard  postInfo={item}/>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        <div className="advertisement"></div>
      </div>
    </div>
  );
}