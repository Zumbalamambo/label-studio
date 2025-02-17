import React, { Component } from "react";
import { observer } from "mobx-react";
import { Card, List } from "antd";
import Utils from "../../utils";
import styles from "../Completions/Completions.module.scss";

const Prediction = observer(({ item, store }) => {
  return (
    <List.Item
      className={item.selected ? `${styles.completion} ${styles.completion_selected}` : styles.completion}
      onClick={ev => {
        !item.selected && store.completionStore.selectPrediction(item.id);
      }}
    >
      <div className={styles.title}>{item.createdBy ? `Model (v. ${item.createdBy})` : null}</div>
      Created
      <i>{item.createdAgo ? ` ${item.createdAgo} ago` : ` ${Utils.UDate.prettyDate(item.createdDate)}`}</i>
    </List.Item>
  );
});

class Predictions extends Component {
  render() {
    const { store } = this.props;

    let content = [];

    store.completionStore.predictions &&
      store.completionStore.predictions.map(predict => {
        if (predict) {
          content.push(<Prediction key={predict.pk} item={predict} store={store} />);
        }
      });

    return (
      <Card title="Predictions" bodyStyle={{ padding: "0" }}>
        <List>
          {store.completionStore.predictions && store.completionStore.predictions.length ? (
            content
          ) : (
            <List.Item>
              <div style={{ padding: "0 12px" }}>No predictions</div>
            </List.Item>
          )}
        </List>
      </Card>
    );
  }
}

export default observer(Predictions);
