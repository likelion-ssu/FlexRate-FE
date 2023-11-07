import RadioThree from '@/components/RadioThree';
import RadioTwo from '@/components/RadioTwo';
import { BasicInput, Button } from '@/styles/BasicStyles';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dropdown from '@/components/Dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { loanApplyInfo } from '@/state/LoanApplyInfo';
import { useRecoilState, useSetRecoilState } from 'recoil';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 567px;
  margin-top: 116px;

  & > h2 {
    font-family: Pretendard;
    font-size: 28px;
    font-weight: 800;
    line-height: 33px;
    letter-spacing: 0em;
    text-align: left;
    color: #262626;
  }
  & > h4 {
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    color: #595959;
    margin: 15px 0px 65px 0px;
  }
`;
const SelectDate = styled(DatePicker)`
  width: 100%;
  height: 55px;
  border-radius: 7px;
  border: 1.5px solid var(--Gray3, #d9d9d9);
  text-align: center;

  &:focus {
    outline: 1.5px solid var(--Primary, #63c393);
    border: none;
  }
`;
const Academic = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const HalfInput = styled(BasicInput)`
  width: 50%;
`;
const DropdownWrapper = styled.div`
  width: 50%;
`;
const Wrapper = styled.div`
  margin-top: 75px;
  & > p {
    margin-top: 25px;
  }
`;
const Credit = styled(Wrapper)`
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 25px;
    & > p {
      text-align: left;
      width: 50%;
    }
  }
`;
const CreditInput = styled(HalfInput)`
  text-align: right;
`;

const CompleteButton = styled.button`
  margin-top: 75px;
  width: 100%;
  height: 55px;
  background-color: #63c393;
  color: #fff;
  border-radius: 7px;
  border: none;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
`;
const CancelButton = styled(CompleteButton)`
  margin-top: 15px;
  background-color: #e3f5ee;
  color: #4d9a75;
`;

const LoanApplication = () => {
  const [myLoanApplyInfo, setMyLoanApplyInfo] = useRecoilState(loanApplyInfo);

  const [academicName, setAcademicName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [income, setIncome] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [homeType, setHomeType] = useState('');
  const [personalRecovery, setPersonalRecovery] = useState(
    myLoanApplyInfo.myPersonalRecovery,
  );
  const [recoveryPayment, setRecoveryPayment] = useState(
    myLoanApplyInfo.myRecoveryPayment,
  );

  //dropdown
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedEmployment, setSelectedEmployment] = useState('');
  const [selectedAcademicType, setSelectedAcademic] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const jobOptions = ['직장인', '사업자', '프리랜서', '기타'];
  const employmentOptions = ['정규직', '계약직', '기타'];
  const academicTypeOptions = ['고졸', '전문대졸', '대졸', '석사', '박사'];
  const purposeOptions = ['목적1', '목적2', '목적3', '목적4', '목적5'];

  const handleJobChange = (value: string) => {
    setSelectedJob(value);
  };
  const handleEmploymentChange = (value: string) => {
    setSelectedEmployment(value);
  };
  const handleAcademicChange = (value: string) => {
    setSelectedAcademic(value);
  };
  const handlePurposeChange = (value: string) => {
    setSelectedPurpose(value);
  };
  const handleAcademicNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcademicName(e.target.value);
  };
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(e.target.value);
  };
  const handleCreditScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditScore(e.target.value);
  };
  const personalRecoveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalRecovery(e.target.value);
  };
  const recoveryPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecoveryPayment(e.target.value);
  };

  return (
    <Container>
      <h2>대출 심사 · 신청</h2>
      <h4>대출 심사를 진행하기 위해 본인의 신용 평가 정보를 기입해주세요.</h4>

      <h3>직업</h3>
      <p>업종</p>
      <Dropdown
        options={jobOptions}
        value={selectedJob}
        onChange={handleJobChange}
        ph={myLoanApplyInfo.myJob}
      />

      <p>고용형태</p>
      <Dropdown
        options={employmentOptions}
        value={selectedEmployment}
        onChange={handleEmploymentChange}
        ph={myLoanApplyInfo.myEmployment}
      />

      <p>입사년월</p>
      <SelectDate
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        dateFormat="yyyy년 MM월"
        popperPlacement="bottom"
        showPopperArrow={false}
        showMonthYearPicker
        placeholderText={(myLoanApplyInfo.myDate as Date).toLocaleDateString()}
      />

      <p>학력</p>
      <Academic>
        <HalfInput
          placeholder={myLoanApplyInfo.myAcademicName}
          onChange={handleAcademicNameChange}
        ></HalfInput>
        <DropdownWrapper>
          <Dropdown
            options={academicTypeOptions}
            value={selectedAcademicType}
            onChange={handleAcademicChange}
            ph={myLoanApplyInfo.myAcademicType}
          />
        </DropdownWrapper>
      </Academic>

      <Credit>
        <h3>신용</h3>
        <div>
          <p>연소득</p>
          <p>신용등급</p>
        </div>
        <div>
          <CreditInput
            placeholder={myLoanApplyInfo.myIncome + '만원'}
            onChange={handleIncomeChange}
          ></CreditInput>
          <CreditInput
            placeholder={myLoanApplyInfo.myCreditScore + '점'}
            onChange={handleCreditScoreChange}
          ></CreditInput>
        </div>
        <p>주거정보</p>
        <RadioThree
          prop1="자가"
          prop2="전세"
          prop3="월세"
          commonname="homeType"
        />
        <div>
          <p>개인회생자 여부</p>
          <p>개인회생 납부 여부</p>
        </div>
        <div>
          <RadioTwo
            prop1="예"
            prop2="아니오"
            commonname="personalRecovery"
            onRadioChange={personalRecoveryChange}
          />
          <RadioTwo
            prop1="예"
            prop2="아니오"
            commonname="recoveryPayment"
            onRadioChange={recoveryPaymentChange}
            disabled={personalRecovery !== 'false'}
          />
        </div>
      </Credit>

      <Wrapper>
        <h3>대출 목적</h3>
        <p>목적</p>
        <Dropdown
          options={purposeOptions}
          value={selectedPurpose}
          onChange={handlePurposeChange}
          ph={myLoanApplyInfo.myPurpose}
        />
      </Wrapper>

      <CompleteButton>수정 완료 및 다시 심사 받기</CompleteButton>
      <CancelButton>그만두기</CancelButton>
    </Container>
  );
};

export default LoanApplication;
