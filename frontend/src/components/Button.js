import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.TouchableOpacity`
  background-color: ${({ theme, isFilled }) =>
    isFilled ? theme.buttonBackground : "transparent"};
  align-items: center;
  border-radius: 4px;
  width: ${({ isRound }) => (isRound ? "50px" : "100%")};
  border-radius: ${({ isRound }) => (isRound ? "100px" : "4px")};
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme, isFilled }) =>
    isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle};
`;

const Button = ({ title, onPress, isFilled, disabled, isRound }) => {
  return (
    <Container
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
      isRound={isRound}
    >
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
};

Button.defaultProps = {
  isFilled: true,
};

Button.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
  isRound: PropTypes.bool,
};

export default Button;
