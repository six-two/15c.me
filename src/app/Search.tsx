import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAsyncDebounce } from 'react-table';

interface Props {
  globalFilter: string,
  setGlobalFilter: (value: string | undefined) => void,
}

export default function GlobalFilter(props: Props) {
  const [value, setValue] = React.useState(props.globalFilter)
  const onChange = useAsyncDebounce(value => {
    props.setGlobalFilter(value || undefined)
  }, 200)
  const intl = useIntl();

  return (
    <div className="table-filter">
      <span><FormattedMessage id="search" />:</span>
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={intl.formatMessage({ id: "search_placeholder" })}
      />
    </div>
  )
}
