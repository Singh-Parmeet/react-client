import PropTypes from 'prop-types';

const result = (props) => {
  const { operator, first, second } = props;
  switch (operator) {
  case '+':
    return first + second;

  case '-':
    return first - second;

  case '*':
    return first * second;

  case '/':
    return second === 0 ? 'Infinity' : first / second;

  default:
    return 'Invalid Operation';
  }
};

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;

  return (
    children
      ? children({
        first,
        second,
        operator,
        result: result(props),
      })
      : `${first} ${operator} ${second} = ${result(props)}`
  );
};

Math.defaultProps = {
  children: null,
};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};

export default Math;
