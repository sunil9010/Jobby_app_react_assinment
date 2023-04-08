import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import './index.css'

const FilterGroups = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const EnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }
  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={EnterSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button-container"
          onClick={getJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }
  const getTheEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div>
        <h1 className="heading">Type of Employment</h1>
        <ul className="employee-type-list-container">
          {employmentTypesList.map(eachEmployee => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                key={eachEmployee.employmentTypeId}
                className="employee-item"
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={eachEmployee.employmentTypeId}
                  value={eachEmployee.employmentTypeId}
                />
                <label
                  htmlFor={eachEmployee.employmentTypeId}
                  className="check-label"
                >
                  {eachEmployee.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const getTheSalaryRange = () => {
    const {salaryRangesList, changeSalary} = props
    return (
      <div className="salary-container">
        <h1 className="heading">Salary Range</h1>
        <ul className="employee-type-list-container">
          {salaryRangesList.map(eachEmployee => {
            const onClickSalary = () => {
              changeSalary(eachEmployee.salaryRangeId)
            }
            return (
              <li
                key={eachEmployee.salaryRangeId}
                className="employee-item"
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachEmployee.salaryRangeId}
                  value={eachEmployee.employmentTypeId}
                  name="salary"
                />
                <label
                  htmlFor={eachEmployee.salaryRangeId}
                  className="check-label"
                >
                  {eachEmployee.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <>
      <div className="filters-group-container">
        {renderSearchInput()}
        <Profile />
        {getTheEmployment()}
        <hr className="line" />
        {getTheSalaryRange()}
      </div>
    </>
  )
}

export default FilterGroups
