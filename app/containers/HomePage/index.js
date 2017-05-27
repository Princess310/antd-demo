/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SwipeAction, List } from 'antd-mobile';

import messages from './messages';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  render() {
    return (
      <List>
        <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={[
            {
              text: 'Cancel',
              onPress: () => console.log('cancel'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
              text: 'Delete',
              onPress: () => console.log('delete'),
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
          left={[
            {
              text: 'Reply',
              onPress: () => console.log('reply'),
              style: { backgroundColor: '#108ee9', color: 'white' },
            },
            {
              text: 'Cancel',
              onPress: () => console.log('cancel'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
          ]}
          onOpen={() => console.log('global open')}
          onClose={() => console.log('global close')}
        >
          <List.Item
            extra="More"
            arrow="horizontal"
          >
            Have left and right buttons
          </List.Item>
        </SwipeAction>
        <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          right={[
            {
              text: 'Cancel',
              onPress: () => console.log('cancel'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
              text: 'Delete',
              onPress: () => console.log('delete'),
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
          left={[
            {
              text: 'Reply',
              onPress: () => console.log('reply'),
              style: { backgroundColor: '#108ee9', color: 'white' },
            },
            {
              text: 'Cancel',
              onPress: () => console.log('cancel'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
          ]}
          onOpen={() => console.log('global open')}
          onClose={() => console.log('global close')}
        >
          <List.Item
            extra="More"
            arrow="horizontal"
          >
            Have left and right buttons
          </List.Item>
        </SwipeAction>
      </List>
    );
  }
}
