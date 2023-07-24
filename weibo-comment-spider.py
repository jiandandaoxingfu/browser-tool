# 作者：pioneer
# 链接：https://juejin.cn/post/7134248954408992776
# 来源：稀土掘金
# 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

# -*- coding:utf-8 -*-
# @time: 2021/5/11 19:00
# @Author: 韩国麦当劳
# @Environment: Python 3.7
# @file: 微博评论.py 

import json
import csv
import re
import requests
import time

# 获取网页源码的文本文件
def get_html(url):
    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6,de;q=0.5",
        "cookie": "XSRF-TOKEN=WMkenkcBpkbej9pnURz0TliA; _s_tentry=weibo.com; Apache=3484643270077.4897.1690080591072; SINAGLOBAL=3484643270077.4897.1690080591072; ULV=1690080591164:1:1:1:3484643270077.4897.1690080591072:; SUB=_2A25JuOXMDeRhGeNM7FQV-SvMyTSIHXVqzFAErDV8PUNbmtANLW-nkW9NSe85-Ssy6Q_pXU5UptmYDVxRwG13omw1; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9W57O73hYAg1rv1HxnUCvzTs5JpX5KzhUgL.Fo-ES0qX1K-7eon2dJLoI0qLxKqL1hnL1K2LxKqL1KBLBo.LxK-L1K5L12BLxK-LB-BL1KMLxKBLB.2L1hqLxK-L1K5L1KMt; ALF=1721616667; SSOLoginState=1690080668; WBPSESS=3L6DjF3bA4RUnz6n8DnT9GiBpfdF6ndPQwg0QURfiA0Ec9kmkU0k2JZllBpCPbcM3dVA3CnmgP2QTZdmTVY5zig0RXMsCJwAb0V_hnByV0_sO5qms9cRKeiEyhCO7Df8v9KqzA4bBzmaY74o2aE1Tw==",
        "sec-ch-ua": '"Chromium";v="110", "Not A(Brand";v="24", "Microsoft Edge";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.57"
    }
    response = requests.get(url, headers=headers)
    response.encoding = response.apparent_encoding
    time.sleep(0.1)
    return response.text

# 保存评论
def save_text_data(data):
    with open("F:/data.txt", "a", encoding="utf-8", newline="") as fi:
        fi = csv.writer(fi)
        fi.writerow(data)

# 获取评论
def get_comments(mid, uid, level, count, max_comment_num):
    max_id = 0
    url = 'https://weibo.com/ajax/statuses/buildComments?is_reload=1&id={}&is_show_bulletin=2&is_mix=0&max_id={}&count=20&uid={}&fetch_level={}&locale=zh-CN'
    while True:
        url_ = url.format(mid, max_id, uid, level)
        response = get_html(url_)
        try:
            content = json.loads(response)
        except:
            print(response)
            break
        max_id = content['max_id']
        text_list = content['data']
        if len(text_list) == 0: # data = [] 说明抓取完毕
            break;
        for text in text_list:
            count += 1
            text_data = text['text_raw']
            try:
                source = text['source']
                total_number = text['total_number']
            except KeyError:
                total_number = content['total_number']
            user_id = text['user']['id']
            user_name = text['user']['screen_name']
            print('评论 {}: '.format(count) if level == 0 else '    回复 {}/{}'.format(count, total_number))
            text_data = ('评论 {}: '.format(count) if level == 0 else '   ') + text_data
            save_text_data([text_data])
            if level == 0 and int(total_number) != 0:  # 如果有二级评论就去获取二级评论
                get_comments(text['mid'], uid, 1, 0, 0)
        if (level == 0 and count > max_comment_num) or int(max_id) == 0: # 如果max_id==0表明评论已经抓取完毕
            break;

if __name__ == '__main__':
    # max_comment_num: 抓取前100-120个评论以及相应的回复
    get_comments(mid='4926667627958800', uid='3800468188', level = 0, count = 0, max_comment_num = 100)