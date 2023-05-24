package com.heydoctor.app.dao;

import com.heydoctor.app.domain.dto.AnswerDTO;
import com.heydoctor.app.domain.dto.Pagination;
import com.heydoctor.app.domain.dto.QuestionListDTO;
import com.heydoctor.app.domain.dto.ReplyDTO;
import com.heydoctor.app.domain.vo.QuestionVO;
import com.heydoctor.app.mapper.MainMapper;
import com.heydoctor.app.mapper.MypageMapper;
import com.heydoctor.app.mapper.QuestionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MypageDAO {
    private final MypageMapper mypageMapper;

    //  질문 게시글 목록
    public List<QuestionVO> findQuestionAll(Pagination pagination)
    {return mypageMapper.selectQuestionAll(pagination);}

    //  질문 답변 목록
    public List<AnswerDTO> findAnswerAll(Pagination pagination)
    {return mypageMapper.selectAnswerAll(pagination);}

    // 댓글 목록
    public List<ReplyDTO> findReplyAll(Pagination pagination)
    {return mypageMapper.selectReplyAll(pagination);}

}