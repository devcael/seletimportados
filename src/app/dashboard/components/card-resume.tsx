import styled from "styled-components";

const ResumeCard = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: start;
  padding: 15px;
  height: 100%;
  background-color: white;
  border-radius: 10px;
`

const IconWrapper = styled.div`
  display: flex;
  position: relative;
  width: fit-content;
  padding: 20px;
  height: 100%;
  background-color: teal;
  color: white;
  align-items: center;
  border-radius: 10px;
`


const ResumeLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 0px 15px;
`
const LabelSpan = styled.span<{ color: string, size: string }>`
  color: ${props => props.color};
  font-size:  calc(var(--scale-fonts) * ${props => props.size});
`

export default function CardResume(props: { label: string, value: string, icon: string, color: string }) {
  return (<ResumeCard>
    <IconWrapper style={{ background: props.color }} >
      <i className={props.icon}></i>
    </IconWrapper>
    <ResumeLabel >
      <LabelSpan color={"grey"} size={"15px"} >{props.label}</LabelSpan>
      <LabelSpan color={"black"} size={"22px"} ><strong>{props.value}</strong></LabelSpan>
    </ResumeLabel>

  </ResumeCard>);
}

