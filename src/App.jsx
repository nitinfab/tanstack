import React, { useState } from "react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import "./App.css"

const defaultData = [
  {
    firstName: "John ",
    lastName: "Doe",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50
  },
  {
    firstName: "Harry",
    lastName: "Porter",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80
  },
  {
    firstName: "Donald",
    lastName: "White",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10
  }
]

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name"
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name"
  }),
  columnHelper.accessor("age", {
    header: "Age",
  }),
  columnHelper.accessor("visits", {
    header: "Visits",
  }),
  columnHelper.accessor("status", {
    header: "Status"
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress"
  })
]

function App() {
  const [data, setData] = useState(() => [...defaultData])
  const [columnVisibility, setColumnVisibility] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  })

  return (
    <div>
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler()
              }}
            />{" "}
            Toggle All
          </label>
        </div>
        {table.getAllLeafColumns().map(column => {
          return (
            <div key={column.id} className="px-1">
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler()
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          )
        })}
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default App
