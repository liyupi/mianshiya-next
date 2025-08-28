import './index.css';
import PostVO = API.PostVO;
import dayjs from "dayjs";

interface IPostCard {
  postInfo: PostVO;
}

const PostCard = (props: IPostCard) => {
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
  }
  const buildUserTags = () => {
    let tags = []
    let out = []
    tags.push(props.postInfo.user?.userProfile ?? '鱼友')
    tags.push(dayjs(props.postInfo.updateTime).format(isToday(props.postInfo.updateTime) ? "今天 HH:mm" : "YYYY-MM-DD HH:mm"))
    tags.forEach((item, index)=>{
      out.push(item);
      if (index + 1 !== tags.length){
        out.push('·')
      }
    })
    return out
  }
  return (
    <div className="post_card">
      <div className="header">
        <div className="cover">
          <img
            src={props.postInfo.user?.userAvatar ?? '/assets/logo.png'}
            alt={props.postInfo.user?.userName ?? '鱼友呀'}
            width='40'
            height='40'
          />
        </div>
        <div className="mono">
          <div className="username">
            {props.postInfo.user?.userName ?? '鱼友呀'}
          </div>
          <div className="usertags">
            {
              buildUserTags().map(item=><div className='tag' key={item}>{item}</div>)
            }
          </div>
        </div>
      </div>
      <div className="content">
        <div className='text'>
          <div className='title'>
            {props.postInfo.title}
          </div>
          <div className='summary'>
            {props.postInfo.summary}
          </div>
          <div className='link_detail'>查看全文</div>
          <div className='post_tags'>
            {
              props.postInfo.tagList?.map(item=>{
                return (
                  <div key={item} className = 'tag'>{item}</div>
                )
              })
            }
          </div>
        </div>
        <div className='cover'>

        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default PostCard;