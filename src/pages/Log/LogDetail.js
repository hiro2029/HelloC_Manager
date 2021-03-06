import {useEffect, useState} from 'react';
import styled from 'styled-components';
import parse, {domToReact} from 'html-react-parser';
import {Redirect, useParams} from 'react-router';

import {usePagination} from '../../hooks/usePagination';
import LogInfo from '../../components/pages/Log/LogInfo';
import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import Pagination from '../../components/Pagination/Pagination';
import {Label} from '../../components/Utilities/Card/Label';
import {CodeBoard} from '../../components/Utilities/Card/CodeBoard';
// import {LogBoard} from '../../components/Utilities/Card/LogBoard';
import {DetailCard, DetailCardContent} from '../../components/Cards/DetailCard';
import {AnswerCard} from '../../components/Cards/AnswerCard';
import {LoadingWindow} from '../../components/Utilities/Loading';
import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../components/Cards/InfoCard';

import {useLog} from '../../hooks/useLog';
import {useUser} from '../../hooks/useUser';
import {Breadcrumbs} from '../../components/Breadcrumbs';
import {AuthContext} from '../../contexts/AuthContext';
import {useContext} from 'react';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import {ErrorContext} from '../../contexts/ErrorContext';
import { InfoCardList } from '../../components/Cards/Lists/InfoCardList';

// const replace = (node) => {
//   if (node.children !== undefined && node.children.length > 0) {
//     let child = <div>{node.children.map((children) => replace(children))}</div>;
//     if (node.name === 'p') {
//       return domToReact(child);
//     } else if (node.type === 'text') {
//       return domToReact(<LogText>{}</LogText>);
//     }
//   }
//   if (node.type === 'text') {
//     return <LogText>{node.data}</LogText>;
//   }

//   if (node.name === 'img') {
//     return <LogImage src={node.attribs.src} />;
//   }
//   return domToReact(node);
// };

// const LogImage = styled.img`
//   position: relative;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 90%;
//   height: auto;
//   margin: 20px 0;
//   border: 1px solid #111111;
//   @media screen and (max-width: 600px) {
//     width: 100%;
//   }

//   @media screen and (min-width: 1500px) {
//     width: 70%;
//   }
// `;

// const LogText = styled.div`
//   font-size: 1.5rem;
//   line-height: 2;
// `;

// const LogCardView = styled.div`
//   position: relative;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 80%;
//   @media screen and (max-width: 800px) {
//     width: 95%;
//   }
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-column-gap: 10px;
//   grid-row-gap: 30px;

//   @media screen and (min-width: 900px) {
//     grid-template-columns: repeat(2, max-content);
//     justify-content: space-evenly;
//   }
// `;

const LogDetail = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  const param = useParams();
  const {logs, getLog} = useLog();
  const [loading, setLoading] = useState(true);
  const {getUser} = useUser();
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const [Log, setLog] = useState();
  const [createdBy, setCreatedBy] = useState();
  const {error, setError, isOpenError, setIsOpenError} = useContext(ErrorContext);

  useEffect(() => {
    setOffset(0);
    getLog(param['id']).then(async (json) => {
      if (json.status === 'fail') throw new Error('??????????????????');
      setLog(json.card_detail_logs);
      console.log(json.card_detail_logs);
      return await getUser(json.user_id).then((json) => {
        if (json.status === 'success') {
          setCreatedBy(json.content.name);
        } else {
          setCreatedBy('????????????');
        }
      });
    })
    // .then(() => getQuestions())
    .then(() => setLoading(false))
    .catch(() => {
      setLoading(false);
    });
      // console.log(json)
      // setLogs(json);
      // getUser(json.content.information_log_id)
      //   .then((json) => {
      //     if (json.status === 'success') {
      //       setCreatedBy(json.content.name);
      //     } else {
      //       setCreatedBy('????????????');
      //     }
      //   })
        // .then(() => setLoading(false))
    // });
  }, []);
  // useEffect(() => {
  //   getLog(param.id)
  //   .then(async (detail_logs) => {

  //   })
  // })

  return loading ? (
    <LoadingWindow />
  ) : (
    <div>
      <PageTitle color='blue'>????????????</PageTitle>
      <Breadcrumbs />
      <Pagination setOffset={setOffset} dataleng={Log ? Log.length : 0} perPage={perPage}></Pagination>
      {Log && (
        <DetailCardContent>
          <InfoCardList>
            {Log.slice(offset, Number(offset) + Number(perPage)).map((Log) => {
              return <CardLogDetail logs={Log} createdBy={createdBy}></CardLogDetail>;
            })}
          </InfoCardList>
        </DetailCardContent>
      )}
      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

const CardLogDetail = ({logs, createdBy}) => {
  console.log(logs.select_history);
  
  // const isSelectHistory => {
  //   if(logs.select_history!=null){
  //     return 
  //   }
  // }
  // console.log(isSelectHistory);
  return (
    
    <div>

      {/* <PageSubTitle color='blue'>????????????</PageSubTitle> */}
      <InfoCard>
      <InfoCardDetail>
        <div>
          <Label>????????????</Label>
          {logs.card_detail_log_id}
        </div>
        <div>
          <Label>????????????</Label>
          {logs.elapsed_time}???
        </div>
        <div>
          <Label>  </Label>
          {logs.select_history?.option}
        </div>
        <div>
          <Label>????????????</Label>
          {logs.result_type}
        </div>
        <div>
          <Label>????????????</Label>
          {logs.trial}
        </div>
        {/* <div> */}
          {/* {isSelectHistory.option!=null && {isSelectHistory.option}
          } */}
          {/* if(logs.select_history != null) {logs.result_type}
          else if(logs.select_history == null) return null; */}
        {/* </div> */}
        {/* <div>
          <Label>?????????</Label>
          {props.data.name}
        </div>
        <div>
          <Label>?????????</Label>
          {User ? User.name : ''}
        </div>
        <div>
          <Label>????????????</Label>
          {props.data.mode}
        </div>
        <div>
          <Label>?????????</Label>
          {props.data.created_at}
        </div> */}
      </InfoCardDetail>
    </InfoCard>
    </div>
  );
};

// const BlankLogDetail = ({selectLog, createdBy}) => {
//   return (
//     <div>
//       <DetailCardContent>
//         <div>
//           <Label>?????????</Label>
//           {selectLog.name}
//         </div>
//         <div>
//           <Label>?????????</Label>
//           {createdBy ? createdBy : ''}
//         </div>
//         <div>
//           <Label>????????????</Label>
//           {selectLog.mode}
//         </div>
//         <div>
//           <Label>?????????</Label>
//           {selectLog.created_at}
//         </div>
//         <div>
//           <Label>????????????</Label>
//           {selectLog.blank_select_log.language}
//         </div>
//         <div>
//           <Label>????????????</Label>
//           <span>
//             {Math.trunc(selectLog.time_limit / 60)}???{selectLog.time_limit % 60}???
//           </span>
//         </div>
//         <div>
//           <Label>??????????????????</Label>
//           {selectLog.blank_select_log.max_exec_time} sec
//         </div>
//         <div>
//           <Label>????????????</Label>
//           {selectLog.number_limit}???
//         </div>
//         <div>
//           <Label>?????????</Label>
//           {selectLog.blank_select_log.hint_type}
//         </div>
//       </DetailCardContent>

//       <PageSubTitle color='blue'>????????????</PageSubTitle>
//       <CodeBoard code={selectLog.blank_select_log.base_code} />
//       <LogBoard>{parse(selectLog.blank_select_log.explain, {replace})}</LogBoard>

//       <PageSubTitle color='red'>??????????????????</PageSubTitle>
//       <LogCardView>
//         {selectLog &&
//           Object.entries(selectLog.blank_select_log.select_blank).map((card, index) => {
//             return (
//               <AnswerCard
//                 options={Object.entries(card[1].option).map((elem, i) => elem[1])}
//                 answer={
//                   selectLog.blank_select_log.correct_blank[index]
//                     ? selectLog.blank_select_log.correct_blank[index]
//                     : -1
//                 }
//               />
//             );
//           })}
//       </LogCardView>
//     </div>
//   );
// };

export default LogDetail;
