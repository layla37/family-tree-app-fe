

const PersonPage = (props) => {
  return (
    <div>{props.match.params.name}</div>
  )
}

export default PersonPage;
