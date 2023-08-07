#include <stdio.h>
int main(void){
    int a[15][15]={0};
    int k,n;  //k는 층 n은 호 
    int t; //테스트 케이스의 수 
    int i,j,p;//반복을 위한 변수 
    
    for(i=0;i<15;i++){
        a[0][i]=i+1;
    }  
    for(i=0;i<15;i++)
        a[i][0]=1; 
        
    scanf("%d",&t);
    for(i=0;i<t;i++){
        scanf("%d",&k);
        scanf("%d",&n); 
        for(j=1;j<=k;j++){
            for(p=1;p<n;p++){
                a[j][p]=a[j-1][p]+a[j][p-1];
            }
        }
         printf("%d\n",a[k][n-1]);
         //for(j=1;j<=k;j++){
          //  for(p=1;p<n;p++){
           //     printf("a[%d][%d]=%d\n",j,p,a[j][p]);
            }
        
    
    
    
    return 0; 
    } 
    
    
        
        
         