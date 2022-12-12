import './index.css'

const FilterGroup = props => {
  const renderEmpTypeList = () => {
    const {employmentTypesList} = props

    const onClickEmpType = event => {
      const {selectJobType} = props
      selectJobType(event.target.value)
    }
    return (
      <ul className="left-list-cont">
        <hr className="line" />
        <h1 className="type-of-empl">Type of Employment</h1>
        {employmentTypesList.map(eachEmp => (
          <li className="list-item-cont" key={eachEmp.employmentTypeId}>
            <input
              id={eachEmp.employmentTypeId}
              type="checkbox"
              value={eachEmp.employmentTypeId}
              className="checkbox"
              onChange={onClickEmpType}
            />
            <label className="label">{eachEmp.label} </label>
          </li>
        ))}
      </ul>
    )
  }

  const renderSalaryTypeList = () => {
    const {salaryRangesList} = props

    const onClickSalaryRange = event => {
      const {selectSalaryRange} = props
      selectSalaryRange(event.target.value)
    }

    return (
      <ul className="left-list-cont">
        <hr className="line" />
        <h1 className="type-of-empl">Salary Range</h1>
        {salaryRangesList.map(eachSalary => (
          <li className="list-item-cont" key={eachSalary.salaryRangeId}>
            <input
              type="radio"
              id={eachSalary.salaryRangeId}
              value={eachSalary.salaryRangeId}
              name="salary"
              className="radio"
              onChange={onClickSalaryRange}
            />
            <label className="label radio-label">{eachSalary.label} </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {renderEmpTypeList()}
      {renderSalaryTypeList()}
    </>
  )
}

export default FilterGroup
