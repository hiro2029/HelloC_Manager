// API GitHubリンク: https://github.com/HIT-matsumotolab/HelloC_API

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//一覧ページ等
import Home from './pages/Home/Home';
import Header from './components/Header';
import GroupList from './pages/Group/GroupList';
import UserList from './pages/User/UserList';
import QuestionList from './pages/Question/QuestionList';
import BookList from './pages/Book/BookList';

//詳細ページ
import GroupDetail from './pages/Group/GroupDetail';
import BookDetail from './pages/Book/BookDetail';
import QuestionDetail from './pages/Question/QuestionDetail';

//問題作成・編集ページ
import CreateBlankQuestion from './pages/Question/create/CreateBlankQuestion';

//認証ページ
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

//ログイン者のデータ表示ページ
import LoginUser from './pages/LoginUser';

//ContextのProvider
import {QuestionProvider} from './contexts/QuestionContext';
import {BookProvider} from './contexts/BookContext';
import {UserProvider} from './contexts/UserContext';
import {GroupProvider} from './contexts/GroupContext';
import {PaginationProvider} from './contexts/PaginationContext';
import {AuthProvider} from './contexts/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import {ErrorProvider} from './contexts/ErrorContext';

const App = () => {
  return (
    <Router>
      <ErrorProvider>
        <AuthProvider>
          <PaginationProvider>
            <GroupProvider>
              <BookProvider>
                <QuestionProvider>
                  <UserProvider>
                    <MuiThemeProvider>
                      <div>
                        <Header></Header>
                        <Switch>
                          {/* 一覧ページのルーティング */}
                          <Route exact path='/group'>
                            <GroupList />
                          </Route>
                          <Route exact path='/user'>
                            <UserList />
                          </Route>
                          <Route exact path='/question'>
                            <QuestionList />
                          </Route>
                          <Route exact path='/book'>
                            <BookList />
                          </Route>
                          <Route exact path='/'>
                            <Home />
                          </Route>

                          {/* 詳細ページのルーティング */}

                          <Route render={() => <GroupDetail />} path='/group/:id(\d+)' />

                          <Route render={() => <BookDetail />} path='/book/:id(\d+)' />

                          <Route render={() => <QuestionDetail />} path='/question/:id(\d+)' />

                          {/*  問題作成・編集ページのルーティング */}
                          <Route render={() => <CreateBlankQuestion />} path='/question/createBlank' />

                          {/* 認証ページ のルーティング*/}
                          <Route render={() => <Register />} path='/register' />
                          <Route render={() => <Login />} path='/login' />

                          {/* ログイン者のデータ表示ルーティング */}
                          <Route render={() => <LoginUser />} path='/userData' />
                        </Switch>
                      </div>
                    </MuiThemeProvider>
                  </UserProvider>
                </QuestionProvider>
              </BookProvider>
            </GroupProvider>
          </PaginationProvider>
        </AuthProvider>
      </ErrorProvider>
    </Router>
  );
};

export default App;
