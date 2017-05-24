import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabBarButton from './TabBarButton';


export default class Tabs extends React.Component {

  static propTypes = {
    activeTab: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    onActivate: React.PropTypes.func.isRequired,
    flex: React.PropTypes.number,
  }

  static defaultProps = {
    flex: 1,
  }

  handleTabActivate = (title) => {
    const { onActivate } = this.props;

    onActivate(title);
  }

  render() {
    const { activeTab, children, flex } = this.props;

    const tabBarButtons = [];
    let activeContent;

    React.Children.forEach(children, child => {
      const tabName = child.props.name;
      const isActive = tabName === activeTab;

      tabBarButtons.push(
        <TabBarButton
          key={tabName}
          title={tabName}
          isActive={isActive}
          onPress={this.handleTabActivate}
        />
      );

      if (isActive) {
        activeContent = child;
      }
    });

    return (
      <View style={{ alignSelf: 'stretch', flex }}>
        <View style={styles.tabBar}>
          {tabBarButtons}
        </View>
        {activeContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    alignSelf: 'stretch',
    height: 45,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
  },
});
