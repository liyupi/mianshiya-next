use mianshiya;

-- 插入文章示例数据
INSERT INTO article (title, content, summary, cover, tags, category, status, viewNum, thumbNum, favourNum, userId, editTime, createTime, updateTime, isDelete) VALUES
(
    'Spring Boot 集成 Redis 缓存完整指南',
    '# Spring Boot 集成 Redis 缓存完整指南

## 前言
在现代 Web 应用开发中，缓存是提升系统性能的重要手段。Redis 作为一款高性能的内存数据库，被广泛应用于缓存场景。本文将详细介绍如何在 Spring Boot 项目中集成 Redis 缓存。

## 环境准备

### 1. 添加依赖
在 `pom.xml` 中添加 Redis 相关依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### 2. 配置文件
在 `application.yml` 中配置 Redis 连接信息：

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    lettuce:
      pool:
        max-active: 8
        max-wait: -1ms
        max-idle: 8
        min-idle: 0
```

## 核心配置

### Redis 配置类
```java
@Configuration
@EnableCaching
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // 设置序列化器
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        template.setDefaultSerializer(serializer);
        
        return template;
    }
}
```

## 实际应用

### 1. 使用注解方式
```java
@Service
public class UserService {
    
    @Cacheable(value = "user", key = "#id")
    public User getUserById(Long id) {
        // 从数据库查询用户
        return userRepository.findById(id).orElse(null);
    }
    
    @CacheEvict(value = "user", key = "#user.id")
    public void updateUser(User user) {
        userRepository.save(user);
    }
}
```

### 2. 使用 RedisTemplate
```java
@Service
public class CacheService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    public void set(String key, Object value, long timeout) {
        redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
    }
    
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
```

## 最佳实践

1. **合理设置过期时间**：避免内存溢出
2. **选择合适的序列化方式**：平衡性能和可读性
3. **缓存穿透防护**：使用布隆过滤器
4. **缓存雪崩防护**：设置随机过期时间

## 总结
Redis 缓存能够显著提升应用性能，但需要合理使用。在实际项目中，要根据业务特点选择合适的缓存策略。',
    'Spring Boot 集成 Redis 缓存的完整指南，包括环境配置、核心配置类、注解使用和最佳实践，帮助开发者快速上手 Redis 缓存。',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
    '["Spring Boot", "Redis", "缓存", "Java"]',
    'tech',
    1,
    156,
    23,
    8,
    1,
    NOW(),
    NOW(),
    NOW(),
    0
),
(
    '如何准备Java后端面试：技术栈梳理与常见问题',
    '# 如何准备Java后端面试：技术栈梳理与常见问题

## 面试准备策略

### 1. 技术栈梳理

#### 基础知识
- **Java基础**：面向对象、集合框架、多线程、JVM
- **数据结构与算法**：链表、树、排序、动态规划
- **数据库**：MySQL、索引优化、事务ACID
- **框架技术**：Spring、Spring Boot、MyBatis

#### 进阶技能
- **分布式系统**：微服务、消息队列、分布式缓存
- **性能优化**：JVM调优、SQL优化、系统监控
- **架构设计**：设计模式、高并发、高可用

### 2. 常见面试问题

#### Java基础
**Q: 说说HashMap的实现原理**
A: HashMap基于数组+链表+红黑树实现，通过hash函数计算key的位置...

**Q: 线程池的工作原理**
A: 线程池通过复用线程减少创建销毁开销，核心参数包括...

#### 框架相关
**Q: Spring的IOC容器是怎么工作的？**
A: IOC（控制反转）通过依赖注入实现对象管理...

**Q: Spring Boot的自动配置原理**
A: 基于@EnableAutoConfiguration注解，通过spring.factories文件...

#### 数据库
**Q: MySQL的索引原理**
A: MySQL主要使用B+树索引，聚簇索引和非聚簇索引...

**Q: 如何优化慢SQL？**
A: 1. 添加索引 2. 优化查询语句 3. 分库分表...

### 3. 项目经验准备

#### 项目介绍模板
1. **项目背景**：解决了什么问题
2. **技术架构**：使用了哪些技术
3. **个人贡献**：负责了哪些模块
4. **技术难点**：遇到的问题和解决方案
5. **项目成果**：取得了什么效果

#### 常见追问
- 为什么选择这个技术方案？
- 遇到的最大技术难题是什么？
- 如何保证系统的高可用性？
- 性能瓶颈在哪里，如何优化？

### 4. 算法题准备

#### 高频题型
- **数组**：两数之和、三数之和
- **链表**：反转链表、合并链表
- **树**：二叉树遍历、最大深度
- **动态规划**：最长公共子序列、背包问题

#### 刷题建议
1. 先掌握基本数据结构
2. 按类型刷题，总结模板
3. 注重时间空间复杂度分析
4. 多练习手写代码

## 面试技巧

1. **STAR法则**：Situation-Task-Action-Result
2. **技术深度**：不仅知其然，还要知其所以然
3. **沟通能力**：清晰表达技术方案
4. **学习能力**：展示持续学习的态度

## 面试复盘

面试后要及时复盘：
- 哪些问题回答得不好？
- 哪些知识点需要加强？
- 下次如何改进？

祝愿每位Java后端开发者都能收获心仪的offer！',
    'Java后端面试准备完整攻略，涵盖技术栈梳理、常见面试问题、项目经验准备和算法题刷题建议，助你顺利通过面试。',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    '["Java", "面试", "后端开发", "求职"]',
    'interview',
    1,
    298,
    45,
    12,
    1,
    NOW(),
    DATE_SUB(NOW(), INTERVAL 2 DAY),
    DATE_SUB(NOW(), INTERVAL 2 DAY),
    0
),
(
    '程序员如何在工作中持续成长',
    '# 程序员如何在工作中持续成长

## 成长的重要性

在快速发展的技术行业，持续学习和成长是程序员职业发展的关键。技术更新换代快，只有不断提升自己，才能在激烈的竞争中保持优势。

## 技术成长路径

### 1. 深度与广度并重
- **技术深度**：在主要技术栈上深入钻研
- **技术广度**：了解相关技术生态
- **跨领域学习**：前端、后端、运维全栈发展

### 2. 实践驱动学习
- 参与开源项目
- 搭建个人项目
- 解决实际业务问题
- 技术分享和总结

### 3. 系统性学习
- 制定学习计划
- 读经典技术书籍
- 观看技术视频
- 参加技术会议

## 软技能提升

### 1. 沟通协作能力
- 技术方案讲解
- 跨部门协作
- 代码Review
- 文档编写

### 2. 问题解决能力
- 分析问题根因
- 设计解决方案
- 权衡技术选型
- 持续优化改进

### 3. 项目管理能力
- 需求分析
- 任务拆解
- 进度把控
- 风险识别

## 职场晋升策略

### 1. 主动承担责任
- 接受有挑战性的任务
- 主动发现和解决问题
- 推动团队技术改进
- 帮助新人成长

### 2. 建立影响力
- 技术分享
- 内部培训
- 技术调研
- 最佳实践推广

### 3. 跨团队合作
- 了解业务需求
- 参与产品设计
- 与其他技术团队协作
- 推动技术标准化

## 学习资源推荐

### 技术类
- **官方文档**：最权威的学习资料
- **GitHub**：优秀开源项目学习
- **技术博客**：业界大牛经验分享
- **在线课程**：系统性学习平台

### 软技能类
- **管理类书籍**：《人月神话》、《代码大全》
- **沟通技巧**：《金字塔原理》
- **职业发展**：《程序员的职业素养》

## 避免的陷阶

1. **技术孤岛**：只关注技术，忽视业务
2. **完美主义**：过度优化，影响交付
3. **舒适区依赖**：拒绝新挑战
4. **单打独斗**：忽视团队协作

## 总结

程序员的成长是一个持续的过程，需要在技术深度、业务理解、团队协作等多个维度均衡发展。保持学习热情，勇于接受挑战，相信每个人都能在职业道路上越走越远。

记住：成长不是一蹴而就的，而是每天进步一点点的积累。',
    '探讨程序员在工作中如何实现持续成长，包括技术提升、软技能培养、职场晋升策略等方面的实用建议。',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
    '["职业发展", "程序员成长", "软技能", "学习方法"]',
    'career',
    1,
    189,
    31,
    15,
    1,
    NOW(),
    DATE_SUB(NOW(), INTERVAL 5 DAY),
    DATE_SUB(NOW(), INTERVAL 5 DAY),
    0
),
(
    'MySQL索引优化实战笔记',
    '# MySQL索引优化实战笔记

## 索引基础概念

### 什么是索引
索引是数据库中用于快速查找数据的数据结构，类似于书籍的目录。MySQL主要使用B+树作为索引的数据结构。

### 索引类型
1. **主键索引**：唯一且不为空
2. **唯一索引**：值唯一但可为空
3. **普通索引**：最基本的索引
4. **复合索引**：多个字段组成的索引
5. **前缀索引**：对字符串前几个字符建索引

## 索引优化原则

### 1. 最左前缀原则
复合索引(a,b,c)可以匹配：
- a
- a,b  
- a,b,c

但不能匹配：
- b
- c
- b,c

### 2. 避免索引失效
```sql
-- 索引失效的情况
SELECT * FROM user WHERE name LIKE ''%张'';  -- 前导模糊查询
SELECT * FROM user WHERE age + 1 = 25;     -- 函数运算
SELECT * FROM user WHERE name != ''张三'';   -- 不等于操作
```

### 3. 选择性原则
- 为选择性高的字段建索引
- 避免为重复值多的字段建索引

## 实战案例分析

### 案例1：慢查询优化
```sql
-- 优化前
SELECT * FROM order WHERE create_time > ''2023-01-01'' AND status = 1;

-- 分析执行计划
EXPLAIN SELECT * FROM order WHERE create_time > ''2023-01-01'' AND status = 1;

-- 优化方案：建立复合索引
CREATE INDEX idx_status_time ON order(status, create_time);
```

### 案例2：分页查询优化
```sql
-- 深度分页问题
SELECT * FROM article LIMIT 100000, 10;

-- 优化方案：使用子查询
SELECT * FROM article WHERE id >= (
    SELECT id FROM article LIMIT 100000, 1
) LIMIT 10;
```

### 案例3：JOIN查询优化
```sql
-- 确保JOIN字段有索引
SELECT u.name, o.amount 
FROM user u 
JOIN order o ON u.id = o.user_id 
WHERE u.status = 1;

-- 为JOIN字段和WHERE条件字段建索引
CREATE INDEX idx_user_id ON order(user_id);
CREATE INDEX idx_status ON user(status);
```

## 监控和分析工具

### 1. EXPLAIN分析
重点关注：
- type: 连接类型(const > eq_ref > ref > range)
- key: 使用的索引
- rows: 扫描行数
- Extra: 额外信息

### 2. 慢查询日志
```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 1;
SET GLOBAL long_query_time = 2;
```

### 3. 性能监控
- **pt-query-digest**: 分析慢查询日志
- **MySQL Workbench**: 可视化性能分析
- **Prometheus + Grafana**: 监控数据库性能

## 最佳实践总结

1. **合理建索引**
   - 为WHERE、ORDER BY、JOIN字段建索引
   - 避免过多索引影响写入性能
   - 定期清理无用索引

2. **SQL编写规范**
   - 避免SELECT *
   - 使用具体字段名
   - 合理使用LIMIT

3. **定期维护**
   - 分析表统计信息
   - 重建索引碎片
   - 监控索引使用情况

4. **测试验证**
   - 使用EXPLAIN分析执行计划
   - 压测验证优化效果
   - 监控线上性能指标

通过系统的索引优化，可以大幅提升MySQL查询性能，为应用提供更好的用户体验。',
    'MySQL索引优化的实战笔记，包括索引基础概念、优化原则、实际案例分析和最佳实践，帮助提升数据库查询性能。',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
    '["MySQL", "数据库优化", "索引", "性能调优"]',
    'study',
    1,
    234,
    28,
    19,
    1,
    NOW(),
    DATE_SUB(NOW(), INTERVAL 1 DAY),
    DATE_SUB(NOW(), INTERVAL 1 DAY),
    0
),
(
    'Docker容器化部署实践指南',
    '# Docker容器化部署实践指南

## Docker简介

Docker是一个开源的容器化平台，可以将应用程序及其依赖项打包到轻量级、可移植的容器中。

### 核心概念
- **镜像(Image)**：应用程序的只读模板
- **容器(Container)**：镜像的运行实例
- **Dockerfile**：构建镜像的脚本文件
- **Registry**：镜像仓库

## 基础使用

### 1. 安装Docker
```bash
# Ubuntu安装
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. 基本命令
```bash
# 拉取镜像
docker pull nginx:latest

# 运行容器
docker run -d -p 80:80 --name mynginx nginx

# 查看容器
docker ps

# 进入容器
docker exec -it mynginx bash

# 停止容器
docker stop mynginx
```

## Dockerfile最佳实践

### Spring Boot应用示例
```dockerfile
# 使用官方OpenJDK镜像
FROM openjdk:8-jre-slim

# 设置工作目录
WORKDIR /app

# 复制jar文件
COPY target/myapp.jar app.jar

# 暴露端口
EXPOSE 8080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# 启动应用
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 优化技巧
1. **多阶段构建**：减少镜像大小
2. **合并RUN指令**：减少镜像层数
3. **使用.dockerignore**：排除不需要的文件
4. **选择合适的基础镜像**：如alpine版本

## Docker Compose

### 多服务编排
```yaml
version: ''3.8''
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
    environment:
      - SPRING_PROFILES_ACTIVE=docker

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: myapp
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mysql_data:
```

### 常用命令
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down
```

## 生产环境部署

### 1. 镜像管理
```bash
# 构建镜像
docker build -t myapp:v1.0 .

# 推送到仓库
docker tag myapp:v1.0 registry.example.com/myapp:v1.0
docker push registry.example.com/myapp:v1.0
```

### 2. 容器监控
- **资源限制**：设置CPU和内存限制
- **日志管理**：集中收集容器日志
- **健康检查**：定期检查容器状态

### 3. 安全配置
- 使用非root用户运行容器
- 定期更新基础镜像
- 扫描镜像安全漏洞
- 配置网络隔离

## 常见问题解决

### 1. 容器启动失败
```bash
# 查看详细错误信息
docker logs container_name

# 检查容器配置
docker inspect container_name
```

### 2. 网络连接问题
```bash
# 查看网络配置
docker network ls
docker network inspect bridge
```

### 3. 存储问题
```bash
# 清理无用资源
docker system prune -a

# 查看磁盘使用
docker system df
```

## 总结

Docker容器化部署为应用程序提供了一致的运行环境，简化了部署和运维工作。掌握Docker的基本使用和最佳实践，是现代开发者必备的技能。

通过合理使用Docker，可以实现：
- 环境一致性
- 快速部署
- 资源隔离
- 弹性扩缩容',
    'Docker容器化部署的实践指南，涵盖基础概念、Dockerfile编写、Docker Compose使用、生产环境部署和常见问题解决。',
    'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400',
    '["Docker", "容器化", "部署", "DevOps"]',
    'tech',
    1,
    178,
    22,
    9,
    1,
    NOW(),
    DATE_SUB(NOW(), INTERVAL 3 DAY),
    DATE_SUB(NOW(), INTERVAL 3 DAY),
    0
),
(
    '前端面试高频算法题解析',
    '# 前端面试高频算法题解析

## 数组相关

### 1. 两数之和
```javascript
/**
 * 给定一个整数数组nums和目标值target，找出数组中和为目标值的两个整数的下标
 */
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```

### 2. 数组去重
```javascript
// 方法1：使用Set
function unique1(arr) {
    return [...new Set(arr)];
}

// 方法2：使用filter + indexOf
function unique2(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 方法3：使用reduce
function unique3(arr) {
    return arr.reduce((acc, current) => {
        if (!acc.includes(current)) {
            acc.push(current);
        }
        return acc;
    }, []);
}
```

## 字符串相关

### 1. 反转字符串
```javascript
function reverseString(str) {
    // 方法1：内置方法
    return str.split('''').reverse().join('''');
    
    // 方法2：双指针
    let left = 0, right = str.length - 1;
    const arr = str.split('''');
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr.join('''');
}
```

### 2. 最长公共前缀
```javascript
function longestCommonPrefix(strs) {
    if (!strs.length) return '''';
    
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (!prefix) return '''';
        }
    }
    return prefix;
}
```

## 链表相关

### 1. 反转链表
```javascript
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}
```

### 2. 合并两个有序链表
```javascript
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}
```

## 树相关

### 1. 二叉树的最大深度
```javascript
function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}
```

### 2. 二叉树的层序遍历
```javascript
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(currentLevel);
    }
    
    return result;
}
```

## 动态规划

### 1. 斐波那契数列
```javascript
// 递归 + 记忆化
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// 动态规划
function fibonacciDP(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

### 2. 爬楼梯
```javascript
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev1 = 1, prev2 = 2;
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    return prev2;
}
```

## 排序算法

### 快速排序
```javascript
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}
```

## 面试技巧

1. **理解题目**：确保完全理解题目要求
2. **分析复杂度**：时间和空间复杂度分析
3. **边界条件**：考虑空数组、单元素等情况
4. **代码规范**：变量命名、代码结构清晰
5. **测试用例**：提供几个测试用例验证

## 总结

算法题考查的是逻辑思维和编程基础，平时要多练习，掌握常见的数据结构和算法思想。记住：练习是提高算法能力的唯一途径！',
    '前端面试中常见的算法题解析，包括数组、字符串、链表、树、动态规划等经典题型的JavaScript实现和解题思路。',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    '["前端面试", "算法", "JavaScript", "数据结构"]',
    'interview',
    1,
    267,
    35,
    21,
    1,
    NOW(),
    DATE_SUB(NOW(), INTERVAL 4 DAY),
    DATE_SUB(NOW(), INTERVAL 4 DAY),
    0
);
