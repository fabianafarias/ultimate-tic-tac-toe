var module = angular.module('Game', ['ngRoute']).controller('GameController', 
    function GameController($scope) {  
    function Grid(){
        this.rows = [[0,0,0], [0,0,0], [0,0,0]];  
        this.isPickable = function(){return this === $scope.nextGrid || $scope.nextGrid === null  }
        this.cellAt = function(coords){ return this.rows[coords[0]][coords[1]]; };  
        this.check = function(row, col){
            console.log(row, col);
            if (this.rows[row][col] === 0 && this.isPickable()) {
                this.rows[row][col] = $scope.currentPlayer;
                $scope.nextGrid = $scope.grids[row][col];
                this.testEnd() && $scope.testEndGame();
                if($scope.win === undefined){
                    $scope.currentPlayer = $scope.currentPlayer%2 + 1;
                    $scope.message = "Player " +$scope.currentPlayer+" turn";                          
                }
                if($scope.nextGrid !== undefined){
                    $scope.nextGrid = null;
                }                                
            }
        };

        this.testEnd = function(){
            var winMoves = [
                [ [0,0], [1,0], [2,0] ],
                [ [0,1], [1,1], [2,1] ],
                [ [0,2], [1,2], [2,2] ],
                [ [0,0], [0,1], [0,2] ],
                [ [1,0], [1,1], [1,2] ],
                [ [2,0], [2,1], [2,2] ],
                [ [0,0], [1,1], [2,2] ],
                [ [0,2], [1,1], [2,0] ]
            ];

            for(var move, m=0; move= winMoves[m]; m++){
                if(this.cellAt(move[0])>0 &&
                    this.cellAt(move[0]) === this.cellAt(move[1]) &&
                    this.cellAt(move[1]) === this.cellAt(move[2])){
                    this.win = this.cellAt(move[0]);
                    this.winMove = m+1;
                    $scope.scores[this.win-1]++;
                    return true;
                }
            }

            for(var row=0; row<3; row++){
                for(var col=0; col<3; col++){
                    if(this.cellAt([row, col])===0){ return false;}
                }
            }

            this.win = 0;
            return true; //igualdade
        }
    }

    $scope.testEndGame = function(){
        for(var row=0; row<3; row++){
            for(var col=0; col<3; col++){
               if($scope.grids[row][col].win === undefined){ 
                return false;                
               }  
            }
        }
        $scope.win = $scope.scores[0] === $scope.scores[1] ? 0 : $scope.scores[0] > ScopedCredential.scores[1] ? 1 : 2;  
        $scope.message = $scope.win === 0 ? "Draw game" : "Player " +$scope.win+ "wins !";
    };

    ($scope.init=function(){
        $scope.grids = [[], [], []];
        for(var row=0; row<3; row++){
            for(var col=0; col<3; col++){
               $scope.grids[row][col] = new Grid(); 
            }
        }
        $scope.scores = [0,0];
        $scope.nextGrid = $scope.grids[1][1];
        $scope.currentPlayer = 1;
        $scope.message = "Player " +$scope.currentPlayer+" starts";
    })();
 })
    

