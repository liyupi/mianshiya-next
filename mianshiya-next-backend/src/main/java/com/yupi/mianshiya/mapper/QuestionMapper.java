package com.yupi.mianshiya.mapper;

import com.yupi.mianshiya.model.entity.Question;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;

/**
* @author 李鱼皮
* @description 针对表【question(题目)】的数据库操作Mapper
* @createDate 2024-08-24 21:46:47
* @Entity com.yupi.mianshiya.model.entity.Question
*/
public interface QuestionMapper extends BaseMapper<Question> {

    /**
     * 查询题目列表（包括已被删除的数据）
     */
    @Select("select * from question where updateTime >= #{minUpdateTime}")
    List<Question> listQuestionWithDelete(Date minUpdateTime);

}
