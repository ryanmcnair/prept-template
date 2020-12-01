import React from 'react';
// import { Button } from 'reactstrap';
import AnswerCard from '../../components/Cards/AnswerCard';
import QuestionCard from '../../components/Cards/QuestionCard';
import AddForm from '../../components/Forms/addForm';
import QuestionData from '../../helpers/data/questionData';

export default class FlashCard extends React.Component {
  state = {
    flashCards: [],
    currentCard: {},
    answer: false,
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (!this.state.answer) {
      QuestionData.getQuestions().then((response) => {
        this.setState({
          flashCards: response,
          currentCard: response[0],
        });
      });
    } else {
      const { flashCards } = this.state;
      const nextQuestion = flashCards.indexOf(this.state.currentCard) + 1;
      this.setState({
        answer: false,
        currentCard: flashCards[nextQuestion] || flashCards[0],
      });
    }
  }

  showAnswerToQuestion = (e) => {
    e.preventDefault();
    this.setState({
      answer: true,
    });
  }

  render() {
    const { answer, currentCard } = this.state;
    const showQuestion = () => <QuestionCard key={currentCard.firebaseKey} card={currentCard} showAnswer={this.showAnswerToQuestion}/>;
    const showAnswer = () => <AnswerCard key={currentCard.firebaseKey} card={currentCard} showNextQuestion={this.loadData}/>;
    return (
      <>
        <AddForm key={currentCard.firebaseKey} onUpdate={this.loadData} />
        <div className="flash-card d-flex flex-wrap justify-content-center">
          {answer === false ? showQuestion() : showAnswer() }
        </div>
      </>
    );
  }
}
