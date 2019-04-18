import { createElement } from 'rax';
import ScrollView from 'rax-scrollview';
import Text from 'rax-text';
import View from 'rax-view';

const DEFAULT_HEIGHT = 480;

const Table = (props) => {
  let {
    width,
    height = DEFAULT_HEIGHT,
    style,
    columns = [],
    dataSource = [],
    columnWidth = undefined,
    renderCell = undefined,

  } = props;

  const _renderCell = (cellData, col) => {
    let width = col.width || columnWidth;
    let style = {};
    if (width) {
      style.width = width;
    } else {
      style.flex = 1;
    }

    return (
      <View key={col.dataIndex} style={[styles.tableCell, style]}>
        <Text>{cellData}</Text>
      </View>
    );
  };

  const _renderHeader = () => {
    return columns.map((col, index) => {
      let width = col.width || columnWidth;
      let style = {};
      if (width) {
        style.width = width;
      } else {
        style.flex = 1;
      }

      return (
        <View key={index} style={[styles.tableHeaderCell, style]}>
          <Text>{col.title}</Text>
        </View>
      );
    });
  };

  const _renderRow = (rowData, index) => {
    if (!renderCell) {
      renderCell = _renderCell.bind(this);
    }
    return (
      <View key={index} style={styles.tableRow}>
        {columns.map(col => renderCell(rowData[col.dataIndex], col))}
      </View>
    );
  };

  return (
    <ScrollView
      style={[style, { width, height }]}
      contentContainerStyle={[style, { width, height }]}
      horizontal={true}>
      <View style={styles.tableBody}>
        <View style={styles.tableHeader}>
          {_renderHeader()}
        </View>
        <ScrollView
          style={styles.tableBody}>
          {dataSource.map((rowData, index) => _renderRow(rowData, index))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = {
  tableHeader: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    minHeight: 30,
    backgroundColor: '#efefef',
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
  },
  tableCell: {
    minHeight: 50,
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Table;
