import {useContext} from 'react';
import {Redirect} from 'react-router';
import {Breadcrumbs} from '../../../components/Breadcrumbs';
import {CreateBlankSelectQuestionForm} from '../../../components/Forms/Question';
import {PageTitle} from '../../../components/Utilities/Title';
import {AuthContext} from '../../../contexts/AuthContext';
import {useUser} from '../../../hooks/useUser';

const CreateBlankQuestion = () => {
  const {authData} = useContext(AuthContext);

  if (!authData) {
    return <Redirect to='/' />;
  }

  const {users} = useUser();
  return (
    <div>
      <PageTitle>空欄補充問題作成</PageTitle>
      <Breadcrumbs />
      <CreateBlankSelectQuestionForm users={users} />
    </div>
  );
};

export default CreateBlankQuestion;
