import React from 'react';
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

  return (
    <div className="table-filter">
      <span>Search:</span>
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Click here and type to search"
      />
    </div>
  )
}
