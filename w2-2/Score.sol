// SPDX-License-Identifier: SimPL-2.0

pragma solidity ^0.8.0;

contract Score {

    constructor () {

    }
    //学生分数的映射
    mapping (string => uint) public scores; 
    
    //老师信息映射
    mapping (address => bool) public teachers;
    
    //对函数施加仅老师可以操作的限制
    modifier onlyTeacher() {
        require(teachers[msg.sender] == true, "the contract is not a teacher");
        _;
    }
    //增加老师
    function setTeacher() public  {
        teachers[msg.sender] = true;
    } 
    //增加或设置学生分数
    function setScore(string calldata name, uint score) public onlyTeacher() {
        require(score<=100, "the score can't up to 100");
        scores[name] = score;
    }
    //获取学生分数
    function getScore(string calldata student) public view returns(uint) {
        require(scores[student]>0, "this student is not exist" );
        return scores[student];
    }

}
//定义接口
interface IScore {
    function setScore(string calldata name, uint _score) external ;
    function getScore(string calldata student) external view returns(uint);
    function setTeacher() external;
}

//老师合约
contract Teacher {
    //初始化合约，需输入学生分数合约地址，并通过调用接口在Score合约中设置新增老师
    constructor(address _scores) {
        IScore(_scores).setTeacher();
    }
    //调用接口新增或改变学生成绩
    function changeScore(address _scores, string calldata _student, uint _score) external {
        IScore(_scores).setScore(_student, _score);
    }
    //调用接口获取学生成绩
    function getScore(address _scores, string calldata _student) external view returns(uint) {
        return IScore(_scores).getScore(_student);
    }
}