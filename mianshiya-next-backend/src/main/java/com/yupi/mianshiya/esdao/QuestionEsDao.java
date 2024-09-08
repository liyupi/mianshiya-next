package com.yupi.mianshiya.esdao;

import com.yupi.mianshiya.model.dto.question.QuestionEsDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/**
 * 题目 ES 操作
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public interface QuestionEsDao extends ElasticsearchRepository<QuestionEsDTO, Long> {

    List<QuestionEsDTO> findByUserId(Long userId);
}