import {useState} from 'react';

import styled, {css} from 'styled-components';

import {Form, Field} from 'react-final-form';
import {PrimaryButton} from '../Buttons/PrimaryButton';
import {PageTitle, PageSubTitle} from '../Utilities/Title';
import {createBlankQuestion as createFetch} from '../API/QuestionAPIs';

const StyledForm = styled.form`
  width: 80%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const InputBox = styled.div`
  display: ${({hidden}) => (hidden ? 'none' : 'grid')};
  grid-template-columns: 180px 1fr;
  align-items: center;
  grid-column-gap: 30px;
  padding-bottom: 30px;
  font-size: 20px;
`;

const StyledField = styled(Field)`
  ${({component}) =>
    (component === 'input' || component === 'select') &&
    css`
      height: 40px;
    `}

  ${({component}) =>
    component === 'textarea' &&
    css`
      font-size: 16px;
      line-height: 1.5;
    `}
`;

const InputLabel = styled.label`
  align-self: center;
  justify-self: end;
  margin: 0;
`;

const TimeLimitBox = styled.div`
  display: grid;
  grid-row-gap: 15px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const TimeLimitBoxUnit = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr max-content;
`;

const Option = styled.option`
  font-size: 20px;
`;

const ChoiceInputUnit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ChoiceInputBox = styled.div`
  grid-template-columns: max-content 1fr;
  align-items: center;
  grid-column-gap: 30px;
  padding-bottom: 30px;
  font-size: 20px;
`;

const onSubmit = (data) => {
  let sec = Number(data.time_limit_minute) * 60 + Number(data.time_limit_second);
  delete data.time_limit_minute;
  delete data.time_limit_second;
  console.log(sec);
  console.log('result:', {...data, time_limit: sec});
  createFetch({...data, time_limit: sec})
    .then(() => {
      alert('問題作成に成功しました！');
    })
    .catch((error) => {
      alert('問題作成に失敗しました。');
      console.error(error);
    });
};

/* 空欄補充形式の問題作成フォーム */
export const CreateBlankSelectQuestionForm = (props) => {
  const [blankNum, setBlankNum] = useState(1);
  const [choiceNum, setChoiceNum] = useState(2);
  const [exampleNum, setExampleNum] = useState(1);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        format: 'blank_select',
        user_id: '',
        mode: '',
        time_limit_minute: 0,
        time_limit_second: 0,
        number_limit: 0,
        explain: '',
        language: 'C',
        base_code: '',
        select_blank: '',
        correct_blank: '',
        stdinout: '',
        hint_type: '',
        max_exec_time: '',
      }}
      render={({handleSubmit}) => (
        <StyledForm onSubmit={handleSubmit}>
          <InputBox>
            <InputLabel label='name'>問題名：</InputLabel>
            <StyledField name='name' type='text' component='input' label='name' />
          </InputBox>

          <InputBox hidden={true}>
            <InputLabel label='format'>フォーマット：</InputLabel>
            <StyledField name='format' type='text' component='input' label='format' />
          </InputBox>

          <InputBox>
            <InputLabel label='user_id'>作成者：</InputLabel>
            <StyledField name='user_id' component='select' label='user_id'>
              <Option value='' key=''>
                ユーザを選択してください
              </Option>
              {props.users &&
                props.users.map((data) => (
                  <option value={data.user_id} key={data.user_id}>
                    {data.name}
                  </option>
                ))}
            </StyledField>
          </InputBox>

          <InputBox>
            <InputLabel label='mode'>問題モード：</InputLabel>
            <StyledField name='mode' component='select' label='mode'>
              <Option value='' key=''>
                モードを選択してください
              </Option>

              <Option value='演習モード' key='演習モード'>
                演習モード
              </Option>

              <Option value='テストモード' key='テストモード'>
                テストモード
              </Option>

              <Option value='リアルタイムモード' key='リアルタイムモード'>
                リアルタイムモード
              </Option>
            </StyledField>
          </InputBox>

          <InputBox>
            <InputLabel label='number_limit'>行数制限：</InputLabel>
            <StyledField name='number_limit' type='number' component='input' label='number_limit' />
          </InputBox>

          <InputBox>
            <InputLabel label='time_limit'>時間制限：</InputLabel>
            <TimeLimitBox>
              <TimeLimitBoxUnit>
                <StyledField
                  name='time_limit_minute'
                  type='number'
                  component='input'
                  label='time_limit_minute'
                  min='0'
                />
                <InputLabel label='time_limit_minute'>分</InputLabel>
              </TimeLimitBoxUnit>
              <TimeLimitBoxUnit>
                <StyledField
                  name='time_limit_second'
                  type='number'
                  component='input'
                  label='time_limit_second'
                  min='0'
                  max='60'
                />
                <InputLabel label='time_limit_second'>秒</InputLabel>
              </TimeLimitBoxUnit>
            </TimeLimitBox>
          </InputBox>

          <InputBox hidden={true}>
            <InputLabel label='language'>言語：</InputLabel>
            <StyledField name='language' type='text' component='input' label='language' />
          </InputBox>

          <InputBox>
            <InputLabel label='explain'>問題文：</InputLabel>
            <StyledField name='explain' component='textarea' label='explain' rows={10} />
          </InputBox>

          <InputBox>
            <InputLabel label='base_code'>問題コード：</InputLabel>
            <StyledField name='base_code' component='textarea' label='base_code' rows={10} />
          </InputBox>

          <InputBox>
            <InputLabel label='max_exec_time'>許容実行時間(秒)：</InputLabel>
            <StyledField name='max_exec_time' type='number' component='input' label='max_exec_time' min='0' />
          </InputBox>

          <InputBox>
            <InputLabel label='hint_type'>ヒントタイプ：</InputLabel>
            <StyledField name='hint_type' component='select' label='hint_type'>
              <Option value='' key=''>
                タイプを選択してください
              </Option>

              <Option value='なし' key='なし'>
                なし
              </Option>

              <Option value='数（不正解）' key='数（不正解）'>
                数（不正解）
              </Option>

              <Option value='場所（不正解）' key='場所（不正解）'>
                場所（不正解）
              </Option>
            </StyledField>
          </InputBox>

          <PageTitle>入出力例</PageTitle>

          <ChoiceInputUnit>
            <ChoiceInputBox>
              <InputLabel>例数：</InputLabel>
              <input
                type='number'
                onChange={(e) => setExampleNum(e.target.value)}
                value={exampleNum}
                min={1}
                max={10}
              />
            </ChoiceInputBox>
          </ChoiceInputUnit>

          {[...new Array(Number(exampleNum))].map((_, i) => {
            return (
              <div>
                <PageSubTitle>例{i + 1}</PageSubTitle>
                <div>
                  <InputBox>
                    <InputLabel label={`stdinout.example${String(i + 1)}.in`}>入力：</InputLabel>
                    <StyledField
                      name={`stdinout.example${String(i + 1)}.in`}
                      type='text'
                      component='input'
                      label={`stdinout.example${String(i + 1)}.in`}
                    ></StyledField>
                  </InputBox>
                  <InputBox>
                    <InputLabel label={`stdinout.example${String(i + 1)}.out`}>出力：</InputLabel>
                    <StyledField
                      name={`stdinout.example${String(i + 1)}.out`}
                      type='text'
                      component='input'
                      label={`stdinout.example${String(i + 1)}.out`}
                    ></StyledField>
                  </InputBox>
                </div>
              </div>
            );
          })}

          <PageTitle>選択肢・解答</PageTitle>

          <ChoiceInputUnit>
            <ChoiceInputBox>
              <InputLabel>選択肢数：</InputLabel>
              <input type='number' onChange={(e) => setChoiceNum(e.target.value)} value={choiceNum} min={2} max={10} />
            </ChoiceInputBox>
            <ChoiceInputBox>
              <InputLabel>空白数：</InputLabel>
              <input type='number' onChange={(e) => setBlankNum(e.target.value)} value={blankNum} min={1} max={10} />
            </ChoiceInputBox>
          </ChoiceInputUnit>

          {[...new Array(Number(blankNum))].map((_, i) => {
            return (
              <div>
                <PageSubTitle>空白{i + 1}</PageSubTitle>
                {[...new Array(Number(choiceNum))].map((_, j) => {
                  return (
                    <InputBox>
                      <InputLabel label={`select_blank.blank${String(i + 1)}.option.option${String(j + 1)}`}>
                        解答{j + 1}：
                      </InputLabel>
                      <StyledField
                        name={`select_blank.blank${String(i + 1)}.option.option${String(j + 1)}`}
                        type='text'
                        component='input'
                        label={`select_blank.blank${String(i + 1)}.option.option${String(j + 1)}`}
                      ></StyledField>
                    </InputBox>
                  );
                })}
                <InputBox>
                  <InputLabel label={`correct_blank.blank${String(i + 1)}`}>正答：</InputLabel>
                  <StyledField
                    name={`correct_blank.blank${String(i + 1)}`}
                    type='text'
                    component='input'
                    label={`correct_blank.blank${String(i + 1)}`}
                  ></StyledField>
                </InputBox>
              </div>
            );
          })}
          <div>
            <PrimaryButton sizeX='large' sizeY='small' onClick={handleSubmit}>
              作成
            </PrimaryButton>
          </div>
        </StyledForm>
      )}
    />
  );
};

/* 記述形式の問題作成フォーム */
export const CreateCodingQuestionForm = (props) => {
  const [blankNum, setBlankNum] = useState(1);
  const [choiceNum, setChoiceNum] = useState(2);
  const [exampleNum, setExampleNum] = useState(1);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        format: 'coding',
        user_id: '',
        mode: '',
        time_limit_minute: 0,
        time_limit_second: 0,
        number_limit: 0,
        explain: '',
        language: 'C',
        base_code: '',
        // select_blank: '',
        // correct_blank: '',
        stdinout: '',
        hint_type: '',
        max_exec_time: '',
      }}
      render={({handleSubmit}) => (
        <StyledForm onSubmit={handleSubmit}>
          <InputBox>
            <InputLabel label='name'>問題名：</InputLabel>
            <StyledField name='name' type='text' component='input' label='name' />
          </InputBox>

          <InputBox hidden={true}>
            <InputLabel label='format'>フォーマット：</InputLabel>
            <StyledField name='format' type='text' component='input' label='format' />
          </InputBox>

          <InputBox>
            <InputLabel label='user_id'>作成者：</InputLabel>
            <StyledField name='user_id' component='select' label='user_id'>
              <Option value='' key=''>
                ユーザを選択してください
              </Option>
              {props.users &&
                props.users.map((data) => (
                  <option value={data.user_id} key={data.user_id}>
                    {data.name}
                  </option>
                ))}
            </StyledField>
          </InputBox>

          <InputBox>
            <InputLabel label='mode'>問題モード：</InputLabel>
            <StyledField name='mode' component='select' label='mode'>
              <Option value='' key=''>
                モードを選択してください
              </Option>

              <Option value='演習モード' key='演習モード'>
                演習モード
              </Option>

              <Option value='テストモード' key='テストモード'>
                テストモード
              </Option>

              <Option value='リアルタイムモード' key='リアルタイムモード'>
                リアルタイムモード
              </Option>
            </StyledField>
          </InputBox>

          <InputBox>
            <InputLabel label='number_limit'>行数制限：</InputLabel>
            <StyledField name='number_limit' type='number' component='input' label='number_limit' />
          </InputBox>

          <InputBox>
            <InputLabel label='time_limit'>時間制限：</InputLabel>
            <TimeLimitBox>
              <TimeLimitBoxUnit>
                <StyledField
                  name='time_limit_minute'
                  type='number'
                  component='input'
                  label='time_limit_minute'
                  min='0'
                />
                <InputLabel label='time_limit_minute'>分</InputLabel>
              </TimeLimitBoxUnit>
              <TimeLimitBoxUnit>
                <StyledField
                  name='time_limit_second'
                  type='number'
                  component='input'
                  label='time_limit_second'
                  min='0'
                  max='60'
                />
                <InputLabel label='time_limit_second'>秒</InputLabel>
              </TimeLimitBoxUnit>
            </TimeLimitBox>
          </InputBox>

          <InputBox hidden={true}>
            <InputLabel label='language'>言語：</InputLabel>
            <StyledField name='language' type='text' component='input' label='language' />
          </InputBox>

          <InputBox>
            <InputLabel label='explain'>問題文：</InputLabel>
            <StyledField name='explain' component='textarea' label='explain' rows={10} />
          </InputBox>

          <InputBox>
            <InputLabel label='base_code'>問題コード：</InputLabel>
            <StyledField name='base_code' component='textarea' label='base_code' rows={10} />
          </InputBox>

          <InputBox>
            <InputLabel label='max_exec_time'>許容実行時間(秒)：</InputLabel>
            <StyledField name='max_exec_time' type='number' component='input' label='max_exec_time' min='0' />
          </InputBox>

          <InputBox>
            <InputLabel label='hint_type'>ヒントタイプ：</InputLabel>
            <StyledField name='hint_type' component='select' label='hint_type'>
              <Option value='' key=''>
                タイプを選択してください
              </Option>

              <Option value='なし' key='なし'>
                なし
              </Option>

              <Option value='数（不正解）' key='数（不正解）'>
                数（不正解）
              </Option>

              <Option value='場所（不正解）' key='場所（不正解）'>
                場所（不正解）
              </Option>
            </StyledField>
          </InputBox>

          <PageTitle>入出力例</PageTitle>

          <ChoiceInputUnit>
            <ChoiceInputBox>
              <InputLabel>例数：</InputLabel>
              <input
                type='number'
                onChange={(e) => setExampleNum(e.target.value)}
                value={exampleNum}
                min={1}
                max={10}
              />
            </ChoiceInputBox>
          </ChoiceInputUnit>

          {[...new Array(Number(exampleNum))].map((_, i) => {
            return (
              <div>
                <PageSubTitle>例{i + 1}</PageSubTitle>
                <div>
                  <InputBox>
                    <InputLabel label={`stdinout.example${String(i + 1)}.in`}>入力：</InputLabel>
                    <StyledField
                      name={`stdinout.example${String(i + 1)}.in`}
                      type='text'
                      component='input'
                      label={`stdinout.example${String(i + 1)}.in`}
                    ></StyledField>
                  </InputBox>
                  <InputBox>
                    <InputLabel label={`stdinout.example${String(i + 1)}.out`}>出力：</InputLabel>
                    <StyledField
                      name={`stdinout.example${String(i + 1)}.out`}
                      type='text'
                      component='input'
                      label={`stdinout.example${String(i + 1)}.out`}
                    ></StyledField>
                  </InputBox>
                </div>
              </div>
            );
          })}

          <PageTitle>選択肢・解答</PageTitle>

          <ChoiceInputUnit>
            <ChoiceInputBox>
              <InputLabel>選択肢数：</InputLabel>
              <input type='number' onChange={(e) => setChoiceNum(e.target.value)} value={choiceNum} min={2} max={10} />
            </ChoiceInputBox>
            <ChoiceInputBox>
              <InputLabel>空白数：</InputLabel>
              <input type='number' onChange={(e) => setBlankNum(e.target.value)} value={blankNum} min={1} max={10} />
            </ChoiceInputBox>
          </ChoiceInputUnit>

          {[...new Array(Number(blankNum))].map((_, i) => {
            return (
              <div>
                <PageSubTitle>空白{i + 1}</PageSubTitle>
                {[...new Array(Number(choiceNum))].map((_, j) => {
                  return (
                    <InputBox>
                      <InputLabel label={`select_blank.blank${String(i + 1)}.option.option${String(j + 1)}`}>
                        解答{j + 1}：
                      </InputLabel>
                      <StyledField
                        name={`select_blank.blank${String(i + 1)}.option.option${String(j + 1)}`}
                        type='text'
                        component='input'
                        label={`select_blank.blank${String(i + 1)}.option.option${String(j + 1)}`}
                      ></StyledField>
                    </InputBox>
                  );
                })}
                <InputBox>
                  <InputLabel label={`correct_blank.blank${String(i + 1)}`}>正答：</InputLabel>
                  <StyledField
                    name={`correct_blank.blank${String(i + 1)}`}
                    type='text'
                    component='input'
                    label={`correct_blank.blank${String(i + 1)}`}
                  ></StyledField>
                </InputBox>
              </div>
            );
          })}
          <div>
            <PrimaryButton sizeX='large' sizeY='small' onClick={handleSubmit}>
              作成
            </PrimaryButton>
          </div>
        </StyledForm>
      )}
    />
  );
};

