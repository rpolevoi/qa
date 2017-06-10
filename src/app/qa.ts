

interface Tag {
    q:string;
    a:string
}

export interface QA {
    q:string;
    a:string;
    tag:Tag
}

export interface ViewedQA {
    tag:Tag;
    index:number;
    bookmark:boolean;
    qOnly:boolean;
    noteQ?:string;
    noteA?:string
    $key?:string
} 


