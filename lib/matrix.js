module.exports = Matrix;

function Matrix(VALUE){
    /*
     *效果说明:
     *创建一个矩阵
     */
    if(VALUE.length != 0){
        if(VALUE.every(function(item){
            if( item.every(function(item2){
                if(typeof item2 === 'number'){
                    return true;
                }else{
                    return false;
                }
            })){
                return true;
            }else{
                return false;
            }
        })){
            this.value = VALUE;
            this.row = VALUE.length;
            this.column = VALUE[0].length;
        }else{
            console.error("[matrix_tool] the element of matrix must be a number");
        }
    }
    else{
        console.error("[matrix_tool] there is no element in matrix");
    }
}

Matrix.prototype.Add = function(M){
    /*
     *效果说明:
     *矩阵相加，在本矩阵基础上加上M矩阵,获得一个新的矩阵
     *
     */

    //新的矩阵
    var OutPut = new Matrix([0]);//写一个0为了获取OutPut.value[0]的长度
    //这两个变量用于循环遍历矩阵
    var row;
    var column;

    if(this.row == M.row && this.column == M.column)//同型矩阵判断
    {
        for(row = 0;row < this.row; row++)
        {
            //初始化每一行的数组，否则无法使用数组脚标(js没有二维数组)
            OutPut.value[row] = [];

            for(column = 0;column < this.column; column++)
            {
                OutPut.value[row][column] = this.value[row][column] + M.value[row][column];
            }
        }
    }
    else
    {
        console.error('[matrix_tool] columns and row of two matrix must be same');
    }

    return OutPut;
}

Matrix.prototype.Multiple = function(M){
    /*
     *效果说明:
     *矩阵相乘，在本矩阵基础上右乘M矩阵，获得新的矩阵
     *
     */

    //新的矩阵
    var OutPut = new Matrix([0]);//写一个0为了获取OutPut.value[0]的长度

    //这两个变量用于循环遍历矩阵
    var row;
    var column;

    //临时储存的变量
    var sum = 0;
    var i;

    if(this.column == M.row)//列数等于行数
    {
        for(row = 0;row < this.row;row++)
        {
            //初始化每一行的数组，否则无法使用数组脚标(js没有二维数组)
            OutPut.value[row] = [];

            for(column = 0;column < this.column; column++)
            {
                sum = 0;

                for(i = 0;i < this.column;i++)
                {
                    sum += this.value[row][i] * M.value[i][column];
                }

                OutPut.value[row][column] = sum;
            }
        }
    }
    else
    {
        console.error('[matrix_tool] columns and rows must be same');
    }
    //设置矩阵行，列
    OutPut.ReFreshRC();
    return OutPut;
}

Matrix.prototype.GetNumber = function(row,column){
    if(row <= this.row && column <= this.column && row > 0 && column >0){
        return this.value[row-1][column-1];
    }
    else{
        console.error("[matrix_tool] can not get the number");
    }
}

Matrix.prototype.ReFreshRC = function(){
    /*
     *效果说明：
     *重新计算矩阵的宽和列
     */
    this.row = this.value.length;
    this.column = this.value[0].length;
}
