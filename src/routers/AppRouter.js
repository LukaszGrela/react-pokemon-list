import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import MediaQuery from 'react-responsive';

import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import PokemonDetailsPage from '../pages/PokemonDetailsPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/index.html" component={() => {
                    return <Redirect to='/' />
                }} />
            </Switch>
            <MediaQuery
                key={'media-query'}
                minWidth={410}>
                {
                    (matches) => {
                        if (matches) {
                            /* normal */
                            return <Switch><Route component={Home} key={'route-1'} /></Switch>
                        } else {
                            /* small devices */
                            return <Switch>
                                <Route path="/" exact component={Home} key={'route-1'} />
                                <Route path="/pokemon/:id" exact component={PokemonDetailsPage} key={'route-2'} />
                                <Route component={Page404} key={'route-3'} />
                            </Switch>
                        }
                    }
                }
            </MediaQuery>
        </div>
    </BrowserRouter>
);

export default AppRouter;