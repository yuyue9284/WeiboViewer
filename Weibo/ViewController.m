//
//  ViewController.m
//  Weibo
//
//  Created by yuyue on 2017/3/13.
//  Copyright © 2017年 yuyue. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UIWebView *webpage;
- (IBAction)back:(id)sender;
- (IBAction)refresh:(id)sender;


@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    NSString *website = @"https://weibo.com";
    NSURL *url = [NSURL URLWithString:website];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webpage loadRequest:request];
    self.webpage.delegate = self;
    
}


- (void) webViewDidFinishLoad:(UIWebView *)wb
{
    //Execute javascript method or pure javascript if needed
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"test" ofType:@"js"];
    NSString *jsString = [[NSString alloc] initWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    [wb stringByEvaluatingJavaScriptFromString:jsString];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (IBAction)back:(id)sender {
    [self.webpage goBack];
}

- (IBAction)refresh:(id)sender {
    [self.webpage reload];
}
@end
