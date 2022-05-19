import {useEffect, useState} from 'react';
import styled from 'styled-components';
import parse, {domToReact} from 'html-react-parser';
import {Redirect, useParams} from 'react-router';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {Label} from '../../components/Utilities/Card/Label';
import {CodeBoard} from '../../components/Utilities/Card/CodeBoard';
import {QuestionBoard} from '../../components/Utilities/Card/QuestionBoard';
import {DetailCard, DetailCardContent} from '../../components/Cards/DetailCard';
import {AnswerCard} from '../../components/Cards/AnswerCard';
import {LoadingWindow} from '../../components/Utilities/Loading';

import {useQuestion} from '../../hooks/useQuestion';
import {useUser} from '../../hooks/useUser';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import {ErrorContext} from '../../contexts/ErrorContext';

const replace = (node) => {
  if (node.children !== undefined && node.children.length > 0) {
    let child = <div>{node.children.map((children) => replace(children))}</div>;
    if (node.name === 'p') {
      return domToReact(child);
    } else if (node.type === 'text') {
      return domToReact(<QuestionText>{}</QuestionText>);
    }
  }
  if (node.type === 'text') {
    return <QuestionText>{node.data}</QuestionText>;
  }

  if (node.name === 'img') {
    return <QuestionImage src={node.attribs.src} />;
  }
  return domToReact(node);
};

const QuestionImage = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: auto;
  margin: 20px 0;
  border: 1px solid #111111;
  @media screen and (max-width: 600px) {
    width: 100%;
  }

  @media screen and (min-width: 1500px) {
    width: 70%;
  }
`;

const QuestionText = styled.div`
  font-size: 1.5rem;
  line-height: 2;
`;

const QuestionCardView = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  @media screen and (max-width: 800px) {
    width: 95%;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 30px;

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(2, max-content);
    justify-content: space-evenly;
  }
`;

const QuestionDetail = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  const param = useParams();
  const {selectQuestion, getQuestion} = useQuestion();
  const [loading, setLoading] = useState(true);
  const {getUser} = useUser();
  const [createdBy, setCreatedBy] = useState();
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  useEffect(() => {
    getQuestion(param['id']).then((json) =>
      getUser(json.content.user_id)
        .then((json) => {
          if (json.status === 'success') {
            setCreatedBy(json.content.name);
          } else {
            setCreatedBy('取得失敗');
          }
        })
        .then(() => setLoading(false))
    );
  }, []);

  return loading ? (
    <LoadingWindow />
  ) : (
    <div>
      <PageTitle color='blue'>問題詳細</PageTitle>
      <Breadcrumbs />
      <DetailCard>
        {selectQuestion && selectQuestion.card_question && (
          <CardQuestionDetail selectQuestion={selectQuestion} createdBy={createdBy}></CardQuestionDetail>
        )}

        {selectQuestion && selectQuestion.blank_select_question && (
          <BlankQuestionDetail selectQuestion={selectQuestion} createdBy={createdBy}></BlankQuestionDetail>
        )}
      </DetailCard>
      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

const CardQuestionDetail = ({selectQuestion, createdBy}) => {
  return (
    <div>
      <DetailCardContent>
        <div>
          <Label>問題名</Label>
          {selectQuestion.name}
        </div>
        <div>
          <Label>作成者</Label>
          {createdBy ? createdBy : ''}
        </div>
        <div>
          <Label>問題形式</Label>
          {selectQuestion.mode}
        </div>
        <div>
          <Label>作成日</Label>
          {selectQuestion.created_at}
        </div>
        <div>
          <Label>学習言語</Label>
          {selectQuestion.card_question.language}
        </div>
        <div>
          <Label>解答時間</Label>
          <span>
            {Math.trunc(selectQuestion.time_limit / 60)}分{selectQuestion.time_limit % 60}秒
          </span>
        </div>
        <div>
          <Label>実行時間制限</Label>
          {selectQuestion.card_question.max_exec_time} sec
        </div>
        <div>
          <Label>行数制限</Label>
          {selectQuestion.number_limit}行
        </div>
        <div>
          <Label>ヒント</Label>
          {selectQuestion.card_question.hint_type}
        </div>
      </DetailCardContent>

      <PageSubTitle color='blue'>問題内容</PageSubTitle>
      <CodeBoard code={selectQuestion.card_question.base_code} />
      <QuestionBoard>{parse(selectQuestion.card_question.explain, {replace})}</QuestionBoard>

      <PageSubTitle color='red'>選択肢・解答</PageSubTitle>
      <QuestionCardView>
        {selectQuestion &&
          selectQuestion.card_question.card
            .sort((a, b) => {
              if (a.loc.line >= b.loc.line) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((card, index) => {
              return (
                <AnswerCard
                  line={card.loc.line}
                  options={card.option}
                  answer={
                    selectQuestion.card_question.correct_blank[index]
                      ? selectQuestion.card_question.correct_blank[index]
                      : -1
                  }
                />
              );
            })}
      </QuestionCardView>
    </div>
  );
};

const BlankQuestionDetail = ({selectQuestion, createdBy}) => {
  return (
    <div>
      <DetailCardContent>
        <div>
          <Label>問題名</Label>
          {selectQuestion.name}
        </div>
        <div>
          <Label>作成者</Label>
          {createdBy ? createdBy : ''}
        </div>
        <div>
          <Label>問題形式</Label>
          {selectQuestion.mode}
        </div>
        <div>
          <Label>作成日</Label>
          {selectQuestion.created_at}
        </div>
        <div>
          <Label>学習言語</Label>
          {selectQuestion.blank_select_question.language}
        </div>
        <div>
          <Label>解答時間</Label>
          <span>
            {Math.trunc(selectQuestion.time_limit / 60)}分{selectQuestion.time_limit % 60}秒
          </span>
        </div>
        <div>
          <Label>実行時間制限</Label>
          {selectQuestion.blank_select_question.max_exec_time} sec
        </div>
        <div>
          <Label>行数制限</Label>
          {selectQuestion.number_limit}行
        </div>
        <div>
          <Label>ヒント</Label>
          {selectQuestion.blank_select_question.hint_type}
        </div>
      </DetailCardContent>

      <PageSubTitle color='blue'>問題内容</PageSubTitle>
      <CodeBoard code={selectQuestion.blank_select_question.base_code} />
      <QuestionBoard>{parse(selectQuestion.blank_select_question.explain, {replace})}</QuestionBoard>

      <PageSubTitle color='red'>選択肢・解答</PageSubTitle>
      <QuestionCardView>
        {selectQuestion &&
          Object.entries(selectQuestion.blank_select_question.select_blank).map((card, index) => {
            return (
              <AnswerCard
                options={Object.entries(card[1].option).map((elem, i) => elem[1])}
                answer={
                  selectQuestion.blank_select_question.correct_blank[index]
                    ? selectQuestion.blank_select_question.correct_blank[index]
                    : -1
                }
              />
            );
          })}
      </QuestionCardView>
    </div>
  );
};

export default QuestionDetail;
