import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import MediaQuery from 'react-responsive';

import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import PokemonDetailsPage from '../pages/PokemonDetailsPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <header>Pokémon List</header>
            <Switch>
                <Route exact path="/index.html" component={() => {
                    return <Redirect to='/' />
                }} />
                <MediaQuery
                    key={'media-query'}
                    minWidth={410}>
                    {
                        (matches) => {
                            if (matches) {
                                /* normal */
                                return <Route component={Home} key={'route-1'} />
                            } else {
                                /* small devices */
                                return [
                                    <Route path="/" exact component={Home} key={'route-1'} />,
                                    <Route path="/pokemon/:id" exact component={PokemonDetailsPage} key={'route-2'} />,
                                    <Route component={Page404} key={'rout-3'}/>
                                ];
                            }
                        }
                    }
                </MediaQuery>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;