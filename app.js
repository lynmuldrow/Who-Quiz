var app = angular.module('whoQuiz', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			};

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "Which Doctor proclaims 'Allons-y' when excited?",
			options: ["10th", "12th", "9th", "4th"],
			answer: 0
		},
		{
			question: "How is a new Doctor introduced?",
			options: ["The old one dies", "The actor is replaced", "The Doctor regenerates", "The Doctor dissolves"],
			answer: 2
		},
		{
			question: "Which Doctor Who villian sends its victim back into the past at a time before their birth?",
			options: ["Weeping Angel", "Dalek", "Vashta Nerada", "Cyberman"],
			answer: 0
		},
		{
			question: "Where is the Doctor from?",
			options: ["USA", "Gallifrey", "Scotland", "London"],
			answer: 1
		},
		{	
			question: "What is the name of the Doctor's one true love?",
			options: ["River Song", "Martha Jones", "Amy Pond", "Rose Tyler"],
			answer: 3
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});