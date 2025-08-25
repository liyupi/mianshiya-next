use mianshiya;
-- 文章表
create table if not exists article
(
    id           bigint auto_increment comment 'id' primary key,
    title        varchar(512)                       not null comment '文章标题',
    content      longtext                           not null comment '文章内容',
    summary      text                               null comment '文章摘要',
    cover        varchar(1024)                      null comment '封面图片',
    tags         varchar(1024)                      null comment '标签列表（json 数组）',
    category     varchar(256)                       null comment '文章分类',
    status       int      default 0                 not null comment '状态（0-草稿、1-已发布、2-已下线）',
    viewNum      int      default 0                 not null comment '浏览数',
    thumbNum     int      default 0                 not null comment '点赞数',
    favourNum    int      default 0                 not null comment '收藏数',
    userId       bigint                             not null comment '创建用户 id',
    editTime     datetime default CURRENT_TIMESTAMP not null comment '编辑时间',
    createTime   datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime   datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint  default 0                 not null comment '是否删除',
    index idx_title (title),
    index idx_category (category),
    index idx_status (status),
    index idx_userId (userId),
    index idx_createTime (createTime)
) comment '文章' collate = utf8mb4_unicode_ci;

-- 文章点赞表
create table if not exists article_thumb
(
    id         bigint auto_increment comment 'id' primary key,
    articleId  bigint                             not null comment '文章 id',
    userId     bigint                             not null comment '用户 id',
    createTime datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    index idx_articleId (articleId),
    index idx_userId (userId)
) comment '文章点赞';

-- 文章收藏表
create table if not exists article_favour
(
    id         bigint auto_increment comment 'id' primary key,
    articleId  bigint                             not null comment '文章 id',
    userId     bigint                             not null comment '用户 id',
    createTime datetime default CURRENT_TIMESTAMP not null comment '创建时间',
    updateTime datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',
    index idx_articleId (articleId),
    index idx_userId (userId)
) comment '文章收藏';
