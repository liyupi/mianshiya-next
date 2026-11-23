'use client';
import { useParams } from "next/navigation";
import { getPostVoByIdUsingGet } from "@/api/postController";
import React, { useEffect, useState } from "react";
import PostVO = API.PostVO;
import MdViewer from "@/components/MdViewer";
import './index.css';
import dayjs from "dayjs";
import { Button, Divider, Skeleton, Space } from "antd";
import { DownloadOutlined, HeartOutlined, LikeOutlined, PlusOutlined } from "@ant-design/icons";
import { doThumbUsingPost } from "@/api/postThumbController";
import { doPostFavourUsingPost } from "@/api/postFavourController";

export default function PostDetail() {
  const {id} = useParams<{ id: number }>();
  const [post, setPost] = useState<PostVO>();
  const [loading, setLoading] = useState(false);


  const getPostDetail = () => {
    setLoading(false);
    getPostVoByIdUsingGet({id}).then(res => {
      console.log(res);
      setPost(res.data);
      setLoading(true);
    });
  };
  const isToday = (time) => {
    // 处理传入的时间，可以是字符串、时间戳等 Day.js 支持的格式
    const targetDay = dayjs(time);

    // 如果时间无效，返回 false
    if (!targetDay.isValid()) {
      return false;
    }

    // 获取当前时间
    const today = dayjs();

    // 比较年、月、日是否相同
    return (
      targetDay.year() === today.year() &&
      targetDay.month() === today.month() &&
      targetDay.date() === today.date()
    );
  };
  const buildUserTags = () => {
    let tags = [];
    let out = [];
    tags.push(dayjs(post?.updateTime).format(isToday(post?.updateTime) ? "今天 HH:mm" : "YYYY-MM-DD HH:mm"));
    tags.push(`点赞 ` + post?.thumbNum);
    tags.push(`收藏 ` + post?.favourNum);
    tags.forEach((item, index) => {
      out.push(item);
      if (index + 1 !== tags.length) {
        out.push('·');
      }
    });
    return out;
  };

  const doThumb = () =>{
    doThumbUsingPost({postId: post?.id}).then(res=>{
      getPostVoByIdUsingGet({id}).then(res => {
        setPost(res.data);
      });
    })
  }

  const doFavour = () =>{
    doPostFavourUsingPost({postId: post?.id}).then(res=>{
      getPostVoByIdUsingGet({id}).then(res => {
        setPost(res.data);
      });
    })
  }

  useEffect(() => {
    getPostDetail();
  }, []);
  return (
    <div
      className="post_main"
    >
      <div className="scroll_content">
        <div className="advertisement">

        </div>

        <div className="post_list">
          {loading ?
            <>
              <div className="head">
                <h1 className="title">
                  {post?.title}
                </h1>
                <div className="head_post_tags">
                  <div className="tag username">{post?.user?.userProfile ?? '鱼友'}</div>
                  {buildUserTags().map(el => <div key={el} className="tag">{el}</div>)}
                </div>
              </div>
              <div className='md_content'>
                <MdViewer value={post?.content ?? ''} />
              </div>
              <div className='post_tags'>
                {
                  post?.tagList?.map(item=>{
                    return (
                      <div key={item} className = 'tag'>{item}</div>
                    )
                  })
                }
              </div>
              <Divider />
              <div className='footer'>
                <Space split={'|'}>
                  <div className={ post?.hasFavour ? 'action ok_action' : 'action'} onClick={doFavour}>
                    <HeartOutlined /><div style={{marginLeft: 8}}>{post?.favourNum ?? 0}</div>
                  </div>
                  <div className={ post?.hasThumb ? 'action ok_action' : 'action'} onClick={doThumb}>
                    <LikeOutlined /><div style={{marginLeft: 8}}>{post?.thumbNum ?? 0}</div>
                  </div>
                </Space>
              </div>
            </>
            : <Skeleton avatar paragraph={{rows: 4}} />
          }
        </div>
        <div className="advertisement">
          <div className='user_card'>
            <div className='user_info'>
              <div className='cover'>
                <img
                  src={post?.user?.userAvatar ?? '/assets/logo.png'}
                  alt={post?.user?.userName ?? '鱼友呀'}
                  width='40'
                  height='40'
                />
              </div>
              <div className='username'>
                {post?.user?.userName ?? '鱼友呀'}
              </div>
            </div>
            <div className='action'>
              <Button type="primary" shape="round" icon={<PlusOutlined />} size='small'>
                关注
              </Button>
            </div>
          </div>
          <div className="advertisement_static">
            <div className="title">
              广告位招租
            </div>
            {
              [1, 2, 3, 4, 5].map(el => <div key={el} className="item">{'广告栏项目' + el}</div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
