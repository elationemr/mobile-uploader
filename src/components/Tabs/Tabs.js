import React from 'react';
import { StyleSheet, View } from 'react-native';
import TabBarButton from './TabBarButton';


export default class Tabs extends React.Component {

  static propTypes = {
    activeTab: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  handleTabActivate = (title) => {
    const { onChange } = this.props;

    onChange(title);
  }

  render() {
    const { activeTab, children, style } = this.props;

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
      <View style={[styles.container, style]}>
        <View style={styles.tabBar}>
          {tabBarButtons}
        </View>
        {activeContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  tabBar: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    height: 45,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
  },
});
